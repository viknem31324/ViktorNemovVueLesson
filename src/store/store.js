import Vue from 'vue';
import Vuex from 'vuex';
import taskList from './modules/taskList';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        taskList,
    }
});