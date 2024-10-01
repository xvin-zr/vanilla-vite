import { app } from '../app';
import API from './api';

export async function loadData() {
    app.Store.menu = await API.fetchMenu();
}
