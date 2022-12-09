// preparing the route machine

const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    404: "404.html",
    "/Bookstore_app/docs/home":"home.html",
    "/Bookstore_app/books": "books.html",
    "/Bookstore_app/basket": "basket.html"
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes['/Bookstore_app/docs/home'];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById('my-main').innerHTML = html;


    // manipulating the pages

    const getElements = () => {
        
        // the getElement function controls the geting of book from the API and rendering into the various pages
        
        
        //
        const newArray = []; // A global array variable that stores all books
        let quantity = 0;
        
        console.log('Welcome to Upflex')
        
        if(path === "/Bookstore_app/home" || path === "/Bookstore_app/index.html" || path === "/Bookstore_app/" ){
            const api_url = "/docs/book.json"; // the API

        console.log('Welcome to the next part')


            async function getBooks() {

                //the getBooks function retrieve book from the API and distributes to various shelf
                // 

                const fetchData = await fetch(api_url); 
                const output = await fetchData.json();
                console.log(output)
                console.log('hello world')
                

                output.forEach(i => {   
                    document.getElementById('lib-div').innerHTML += ` 
                    <div class="books" id="bk1">
                    <a  href="/Bookstore_app/books" onclick="route()"  class="title a">${i.title}</a>
                    <a  href="/Bookstore_app/books" onclick="route()"  class="description a">${i.metaDescription}</a>                   
                    </div>`;


                    newArray.push(i);
                });
                

                selectedBook = []; // A global array that stores books selected/clicked for view.

                $('.a').click(function(e){
                    //the click method's callback function, searches for book selected/clicked and push it to the selectedBook array.
                

                    let postBook = newArray.find(   function(book){                                    
                        if(book.title === e.target.textContent || book.metaDescription === e.target.textContent){
                            return book;
                        };
                    });                    
                    selectedBook[0] = postBook;
                });
            };
            getBooks()
        }

        else if(path === "/Bookstore_app/books" || path === "/Bookstore_app/home" || path === "/Bookstore_app/"  ){
            selectedBook.forEach(j => {
                document.getElementById('book-sec').innerHTML = ` 
                <div class="adiv">
                    <a href="/docs/" onclick="route()"> < Go Back</a>
                </div>
                
                <div class="book-con">
                    <div id="bookdiv">
                        <div id="img-con"><img src="${j.cover}" alt=""></div>
                        <div id="book-info">
                            <h2 class="text"> Title: </h2>
                            <span id="title">${j.title}</span>
                            <h2 class="text">Author:</h2>
                            <span id="author">${j.author}</span>
                        </div>
                    </div>
                    <button type="submit" id="ATB-btn"> Add to basket</button>
                </div>`
            });

            basket = [];
            trialArray = [...selectedBook];
            

            $('#ATB-btn').click(function(){
                if(basket.includes(trialArray)){
                    increment = basket.length;
                    quantity++;
                    a = qty[0] = quantity;
                    document.getElementById('increment').textContent = quantity;
                
                    
                }
                else{
                    basket.push(trialArray);
                    increment = basket.length;
                    quantity++;
                    qty = [];
                    a = qty[0]= quantity;
                    document.getElementById('increment').textContent = quantity; 
                    
                }                
            })
            

        }
        else if(path === "/Bookstore_app/basket"){
            
            basket.forEach((k) => {
                k.forEach(function(book){
                    $('#bsk-sec2').append( `
                     <div class="book-con">
                     <div id="bookdiv">
                        <h2 id="bookName">${book.title}</h2>
                     </div>    
                    <div id="qty-div"> X <span id="Qty">${qty[0]}</span></div>
                    <button type="submit" id="remove-btn"> Remove</button>   
                </div> `);
    
                $('.bsksum').text('Basket Summary');
                document.getElementById('paybtn').style.display = 'block';

            });
            });
            
            const remove = document.getElementById('remove-btn');

            remove.onclick = () => {
                
                if(a <= 1){
                    basket.forEach((book) => {
                    document.getElementById('increment').textContent = 'Empty';
                    document.querySelector('.book-con').style.display = 'none';
                    document.querySelector('.bsksum').textContent = 'Basket is empty';
                    document.getElementById('paybtn').style.display = 'none';


                        let searchResult = book.find((itm) => {
                            
                            if(itm.title === $('#bookName').text()){
                                // alert("found boook")
                                return book
                            }
                        })
                        
                        
    
                        let edge = [2, 4, 6, 3]
                        
                        delBook = (arr,itm) => {
                            for(i = 0; i < arr.length; i++){
                                if(arr[i] == itm){
                                    delete arr[i]
    
                                };
                            }
                            console.log(edge)
                        }
    
                        delBook(book, searchResult);
                        
                        console.log(book);
                        
                    });
                }
                else{

                    a--
                    document.getElementById('increment').textContent = a;
                    document.getElementById('Qty').textContent = a;
                }
                
            };
            
        }
    }


    getElements()

};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();

3
