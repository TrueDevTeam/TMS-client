

// export function setStats(stats) {
//   return {
//     type: SET_STATS,
//     value: stats,
//   };
// }
//
// export function getActivity(params = {}) {
//   return async (dispatch) => {
//     dispatch(fetchStart());
//
//     try {
//       const { activity, statistics } = await Activity.get(params);
//
//       dispatch(setActivities(activity));
//       dispatch(setStats(statistics));
//       dispatch(fetchSuccess());
//     } catch (error) {
//       setError(error);
//     }
//   };
// }
