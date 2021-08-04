const axios = require('axios').default;
export default class SerchServiceApi{
    constructor() {
        this.page = 1;
        this.limit = 40;
        this.inputValue = '';
        this.KEY_USER = '22750376-949ece007bb93d37043444833';
        this.BASE_URL = 'https://pixabay.com/api/';
    }

 async fetchDate() {
    const url = `${this.BASE_URL}?key=${this.KEY_USER}&q=${this.inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.limit}`;
     const response = await axios.get(url);
     this.incriment();
     return response.data;
    };

    incriment() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

     get query(){
         return this.inputValue;
    }

    set query(newQuery){
        this.inputValue = newQuery;
    }
}

