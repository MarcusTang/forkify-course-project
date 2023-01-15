import View from './View.js';
import * as model  from '../model';



class SearchView {
    _parentElement = document.querySelector('.search');
    _data;
    _errorMessage ='';

    getQuery(){
        const query = this._parentElement.querySelector('.search__field').value;
        this._clearInput();
        return query;
    };

    _clearInput(){
        this._parentElement.querySelector('.search__field').value = '';
        // model.state.search.page = 1;
        
    }

    addhandlerSearch(handler){
        this._parentElement.addEventListener('submit',function(e){
            e.preventDefault();
            handler();
        })
    }

}
export default new SearchView();