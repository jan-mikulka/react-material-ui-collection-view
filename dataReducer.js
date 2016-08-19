import initialState from './initialState';
import update from 'react-addons-update';

const actionsMap = {
  ['FETCH_SIMPLE_DATA'](state, action) {
    return update(state, {$merge: action.payload});
  },
  ['FETCH_DATA'](state, action) {
    return update(state, {
      entities: {$merge: action.payload.entities}
    });
  },
  ['ADD_ITEM'](state, action) {
    let newItem = {[action.id]: Object.assign({id: action.id}, action.props)};
    return update(state, {
      entities: {
        [action.model]: {$merge: newItem}
      }
    });
  },
  ['ADD_RELATION'](state, action) {
    return update(state, {
      entities: {
        [action.model]: {
          [action.modelId]: {
            [action.related]: {$push: [action.relatedId]}
          }
        }
      }
    });
  },
};

export default function reducer(state = initialState.data, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
