import React from 'react';
import {
  compose,
  withHandlers,
  withStateHandlers,
  lifecycle,
  branch,
  renderNothing,
  renderComponent,
} from 'recompose';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

import { generateAbbr } from '../../containers/Production/AddEditProductPage/utils';
import { InsertProductsQuery } from './graph';
import { GroupsQuery } from '../../containers/Production/GroupsPage/graph';
import { InsertGroupQuery } from '../../containers/Production/AddEditGroupPage/graph';
import { colors, measures } from '../../../graph/data/database';
import { messageTypes, fields } from './constants';
import ImportProgress from './ImportProgress';

const FormRow = styled.div`
  display: flex;
  align-items: center;
`;

const addProductsOptions = {
  props: ({ mutate }) => ({
    submit: (products) => mutate({
      variables: { products },
    }),
  }),
};

const addGroupOptions = {
  props: ({ mutate }) => ({
    add: (group) => mutate({
      variables: { group },
    }),
  }),
};

const fetchGroupsOptions = {
  options: () => ({
    notifyOnNetworkStatusChange: true,
  }),
  props: (props) => ({
    groups: props.data.allGroups,
    groupsLoading: props.data.loading,
  }),
};

export default compose(
    graphql(InsertProductsQuery, addProductsOptions),
    graphql(InsertGroupQuery, addGroupOptions),
    graphql(GroupsQuery, fetchGroupsOptions),
    withStateHandlers(
      ({ formedProducts }) => ({
        errors: [],
        localGroups: [],
        localProducts: formedProducts,
        oldToNewProductsMap: [],
        isImported: false,
      }),
      {
        onSetGroups: () => (localGroups) => ({
          localGroups,
        }),
        onSetProductsMap: () => (oldToNewProductsMap) => ({
          oldToNewProductsMap,
        }),
        onSetGroup: ({ localGroups }) => (group) => ({
          localGroups: [...localGroups, group],
        }),
        onNewErrors: ({ errors }) => (newErrors) => ({
          errors: [...errors, ...newErrors],
        }),
        onToggleImportingState: ({ isImported }) => () => ({
          isImported: !isImported,
        }),
      },
    ),
    withHandlers({
      getRandomColor: () => () => colors[Math.floor(Math.random() * colors.length)],
      removeProductDuplicates: ({ allProducts, onNewErrors }) => (reorderedProducts) => {
        const errors = reorderedProducts
            .filter((element) => allProducts.some((product) => product.name === element.name))
            .map((productWithError) => ({
              error: 'Product already exists',
              title: productWithError.name,
              type: messageTypes.WARNING,
            }));
        onNewErrors(errors);
        return reorderedProducts
            .filter((element) => !allProducts.length ||
            !allProducts.some((product) => product.name === element.name));
      },
      validateProduct: () => (product) => !isNaN(product.tax) && !isNaN(product.price.value && measures.some((measure) => measure === product.measure)),
    }),
    withHandlers({
      reorderArray: ({ localProducts, oldToNewProductsMap, removeProductDuplicates }) => () => {
        const reorderedProducts = localProducts.map((product) => {
          const newProduct = {};
          for (const item of oldToNewProductsMap) {
            newProduct[item.oldIndex] = product[item.newIndex];
          }
          return newProduct;
        });
        return removeProductDuplicates(reorderedProducts);
      },
      // to avoid groups duplication when adding new ones
      removeGroupDuplicates: () => (array, key) => (
          array.filter((obj, pos, arr) => (
              arr.map((mapObj) => mapObj[key]).indexOf(obj[key]) === pos
          ))
      ),
      addGroupOnDemand: ({ add, getRandomColor, onSetGroup, localGroups }) => async (groupName) => {
        const result = localGroups.find((group) => group.name === groupName);
        if (result) {
          return result._id;
        }
        const newGroup = {
          name: groupName,
          abbr: generateAbbr(groupName),
          color: getRandomColor(),
        };
        const { data: { insertGroup } } = await add(newGroup);
        onSetGroup(insertGroup);
        return insertGroup._id;
      },
    }),
    withHandlers({
      onChangeFieldPosition: ({ oldToNewProductsMap, onSetProductsMap }) => (oldIndex, newIndex, value) => {
        const localProductsMap = [...oldToNewProductsMap];
        const elementToChange = localProductsMap.find((item) => item.oldIndex === oldIndex);
        const indexOfElementToChange = localProductsMap.indexOf(elementToChange);
        localProductsMap.splice(indexOfElementToChange, 1, {
          oldIndex,
          newIndex,
          value,
        });
        onSetProductsMap(localProductsMap);
      },
      onSubmit: ({
          reorderArray,
          getRandomColor,
          addGroupOnDemand,
          removeGroupDuplicates,
          submit,
          onNewErrors,
          validateProduct,
          onToggleImportingState,
      }) => async () => {
        const reorderedArray = reorderArray()
            // add extra fields
            .map((element) => (
              {
                ...element,
                abbr: generateAbbr(element.name),
                color: getRandomColor(),
                price: {
                  currency: 'EU',
                  value: +element.price,
                },
              }
            ))
            .map((reorderedProduct) => {
              if (validateProduct(reorderedProduct)) {
                onNewErrors([{
                  error: '',
                  title: reorderedProduct.name,
                  type: messageTypes.SUCCESS,
                }]);
                return reorderedProduct;
              }
              onNewErrors([{
                error: 'Wrong data format',
                title: reorderedProduct.name,
                type: messageTypes.ERROR,
              }]);
              return null;
            })
            .filter((product) => product);
        // add necessary groups
        const addedGroups = await Promise.all(
              removeGroupDuplicates(reorderedArray, 'group')
                  .map((product) => product.group)
                  .map(async (group) => ({ [group]: await addGroupOnDemand(group) })));
        const result = reorderedArray
              .map((element) => ({
                ...element,
                group: addedGroups.find((group) => group[element.group])[element.group],
              }));
        await submit(result);
        onToggleImportingState();
      },
    }),
    branch(({ groupsLoading }) => groupsLoading, renderNothing),
    branch(({ localProducts }) => !localProducts.length, renderComponent(({ showConfigurator, toggleDialog }) => (
      <Dialog
        title="Goods Import"
        modal={false}
        open={showConfigurator}
        onRequestClose={() => toggleDialog([])}
      >
        <p>Oops, looks like nothing to import</p>
      </Dialog>
    ))),
    branch(({ isImported }) => isImported, renderComponent(({ errors, isImported, onToggleImportingState, toggleDialog }) => (
      <ImportProgress
        notifications={errors}
        isImported={isImported}
        onRequestClose={() => {
          toggleDialog([]);
          onToggleImportingState();
        }}
      />
    ))),
    lifecycle({
      componentDidMount() {
        const { localProducts, onSetProductsMap, groups, onSetGroups } = this.props;
        const oldToNewMap = Object.values(localProducts[0]).map((element, index) => ({
          oldIndex: fields[index],
          newIndex: fields[index],
          value: element,
        }));
        onSetGroups(groups);
        onSetProductsMap(oldToNewMap);
      },
    })
)(({
    toggleDialog,
    showConfigurator,
    localProducts,
    oldToNewProductsMap,
    onChangeFieldPosition,
    onSubmit,
}) => (
  <Dialog
    title="Goods Import"
    modal={false}
    open={showConfigurator}
    onRequestClose={() => toggleDialog([])}
    autoScrollBodyContent
  >
    <div className="row">
      <form className="col-xl-12 col-md-12">
        <div className="row">
          {oldToNewProductsMap.map((item) => (
            <FormRow className="col-xl-12 col-md-12" key={Math.random() * 1000}>
              <label className="col-lg-2 col-md-2">{item.oldIndex.charAt(0).toUpperCase() + item.oldIndex.slice(1)}</label>
              <SelectField
                className="col-lg-10 col-md-10"
                value={item.value}
                onChange={(event, key, payload) => onChangeFieldPosition(
                        item.oldIndex,
                        fields[key],
                        payload
                    )}
                fullWidth
              >
                {Object.values(localProducts[0]).map((element) => (
                  <MenuItem key={Math.random() * 1000} value={element} primaryText={element} />
                  ))}
              </SelectField>
            </FormRow>
          ))}
        </div>
        <RaisedButton
          label="Submit"
          primary
          className="btn-w-md"
          onClick={onSubmit}
        />
      </form>
    </div>
  </Dialog>
));
