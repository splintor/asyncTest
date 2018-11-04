import axios from 'axios';

const makeRequest = async () => {
  return await axios('http://localhost/myRequest').then(response => response.data);
}

export const state = {somethiongWasDone: false}
const markAsDone = () => {
  state.somethiongWasDone = true;
}

export const doSomething = () => {
  markAsDone();
  makeRequest();
}

export const makeAnotherRequest = async () => {
  return await axios('http://localhost/myOtherRequest').then(response => response.data);
}