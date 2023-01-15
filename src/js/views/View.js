import icon from 'url:../../img/icons.svg' // Parcel 2

export default class View {
    _data;

    /**Render the received object to DOM
     * @param {Object | Object[]} data The  data to be rendered (e.g. recipe) 
     * @param {boolean} [render = true ] if false, create markup string instead of rendering to DOM
     * @returns {undefined | string} A markup string is returned if render = false
     * @this {Object} View instance
     * @author Jonas Schmedtmann
     * @todo FInsih implementation
     */
    render(data, render = true) {
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();

        if(!render){
            return markup;
        }

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    };

    update(data){
       
       
        this._data = data;
        const newMarkup = this._generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));
        // console.log(newElements);
        // console.log(curElements);


        newElements.forEach((newEl,i) => {
            const curEl = curElements[i];
            // console.log(curEl);
            // console.log(curEl,newEl.isEqualNode(curEl));

            // Updates changed TEXT
            if(!newEl.isEqualNode(curEl) 
            && newEl.firstChild?.nodeValue.trim() != '' ) 
            {
                // console.log('💥',newEl.firstChild.nodeValue.trim());
                curEl.textContent = newEl.textContent;
                
            };
            
            // Update changes ATTRIBUTES
            if(!newEl.isEqualNode(curEl)){
                // console.log(Array.from(newEl.attributes));
                Array.from(newEl.attributes).forEach(attr => 
                    curEl.setAttribute(attr.name, attr.value));
            };

            
        })

    };

    _clear () {
        // console.log(this._parentElement);
        this._parentElement.innerHTML = '';
    };

    renderSpinner (){
        const markup = `
        <div class="spinner">
                <svg>
                  <use href="${icon}#icon-loader"></use>
                </svg>
              </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML ('afterbegin', markup);
      
    };

    renderError(message = this._errorMessage){
        const markup = `
            <div class="message">
                <div>
                <svg>
                    <use href="${icon}#icon-alert-triangle"></use>
                </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML ('afterbegin', markup);
    };

    renderMessage(message = this._message){
        const markup = `
            <div class="error">
                <div>
                <svg>
                    <use href="${icon}#icon-smile"></use>
                </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML ('afterbegin', markup);
    }
}