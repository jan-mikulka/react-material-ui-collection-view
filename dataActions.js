import * as h from './helpers';
import { normalize, Schema, arrayOf } from 'normalizr';

const revize = new Schema('revize');
const budova = new Schema('budova');
const zarizeni = new Schema('zarizeni');
const transakce = new Schema('transakce');
const cast = new Schema('cast');
const osoba = new Schema('osoba');
const material = new Schema('material');

revize.define({
    zarizeni: arrayOf(zarizeni),
    budova
});

budova.define({
    cast: arrayOf(cast),
    osoba: arrayOf(osoba)
});

zarizeni.define({
    transakce: arrayOf(transakce)
});

transakce.define({
    material
});

// natahuje data, která se nenormalizují (tudy do aplikace natahuju z backendu např. initialState pro nově přidané položky, validacni pravidla, abych je nemusel definovat na 2 mistech, distinct values do AutoComplete, relations mezi modely)
export function fetchSimpleData(route) {
  return function(dispatch) {
    return fetch('api/'+route).then(response => {
      return response.json().then(function(json) {
        console.log(json);
        dispatch({
         type: 'FETCH_SIMPLE_DATA',
         payload: json,
        });
     });
    }).catch(error => {
      throw(error);
    });
  };
}

//tudy projdou data, ktera se normalizuji middlewarem
export function fetchData(route) {
  var routes = {
    revizes: {revizes: arrayOf(revize)}, 
    materials: {materials: arrayOf(material)}
  };
  return function(dispatch) {
    return fetch('api/'+route).then(response => {
      return response.json().then(function(json) {
        dispatch({
         type: 'FETCH_DATA',
         payload: json,
         meta: {
           schema: routes[route]
         }
        });
     });
    }).catch(error => {
      throw(error);
    });
  };
}

// tady se přidává nová položka, případně i s relations. stejně tak u funkce pro mazání se používá stejný mechanizmus. možná existuje řešení, který používá schema normalizru, ale nenašel sem. i kolega, co jsem s ním mluvil, je na tom podobně. máte nějaké elegantní řešení? 
export function addItem(model, props, relations, ui) {
  return function(dispatch, getState) {
    let newId = parseInt(Date.now()) + parseInt(Math.random());
    let defaultProps = getState().data.classes[model].item || {};
      Object.keys(relations).map(key => {
      dispatch({
       type: 'ADD_RELATION',
       model: key,
       modelId: relations[key],
       related: model,
       relatedId: newId 
      });
    });
    dispatch({
     type: 'ADD_ITEM',
     model,
     id: newId,
     props: Object.assign(defaultProps, props)
    });
    
  };
}

