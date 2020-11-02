"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import MobileCompany from '../components/MobileCompany';

//проверка фильтра "Заблокированные"
test('MobileCompany - Filter - Blocked', () => {
  const testMode = true;
  const clientsArr=[
    {id:101, fam:"test1Иванов", im:"Иван", otch:"Иванович", balance:200}, 
    {id:105, fam:"test2Сидоров", im:"Сидор", otch:"Сидорович", balance:250}, 
    {id:110, fam:"test3Петров", im:"Пётр", otch:"Петрович", balance:180},
    {id:120, fam:"test4Григорьев", im:"Григорий", otch:"Григорьевич", balance:0},
  ];
  
  const component = renderer.create(
    <MobileCompany testMode={testMode} clients={clientsArr}/>
  );

  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot(); 

  const buttonElemFilterActive = component.root.find( elem => elem.props.value == "Заблокированные" ); // ищем кнопку "Заблокированные"
  buttonElemFilterActive.props.onClick();// нажимаем
  
  const tableRows = component.root.findAll( el => el.props.className === "MobileClient" ); // все элементы tr с классом MobileClient (один штука)

  const activeClients = component.root.findAll( el => el.props.className === "MobileClient__blocked" ); // все элементы td с классом blocked (рендерятся, если баланс <= 0)

  expect(tableRows.length).toBe(activeClients.length); //ожидаю, что кол-во отрендеренных элементов 'tr.MobileClient' будет равно кол-ву отрендеренных элементов 'td.MobileClient__blocked'

  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot(); 
});