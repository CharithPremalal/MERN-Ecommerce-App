// add the item to local storage
export const addItem = (item, next) => {
    //create empty cart 
    let cart = []

    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item,
            count: 1
        });
        //creating array to make no duplicate products 
        cart = Array.from(new Set(cart.map((p) =>(p._id)))).map(id => {
            return cart.find(p => p._id === id);
        }); //new set remove duplicates 
        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
};

//create a method to get total items on the cart

export const itemTotal = () => {
    if (typeof window !== 'undefined'){
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }
    return 0;
}







