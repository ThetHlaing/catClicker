var model = {
    currentCat: null,
    cats: [{
        name: 'Cat A',
        clickCount: 0,
        url: 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454'
    },
    {
        name: 'Cat B',
        clickCount: 0,
        url: 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426'
    },
    {
        name: 'Cat C',
        clickCount: 0,
        url: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496'
    },
    {
        name: 'Cat D',
        clickCount: 0,
        url: 'https://d17h27t6h515a5.cloudfront.net/topher/2017/March/58b8af2f_nd001-cat-clicker/nd001-cat-clicker.jpg'
    },
    {
        name: 'Cat E',
        clickCount: 0,
        url: 'https://uploads.scratch.mit.edu/users/avatars/1385/1878.png'
    }]
}



var octopus = {
    init: function () {
        model.currentCat = model.cats[0];
        catListView.init();
        catView.init();
        adminView.init();
    },
    getAllCats: function () {
        return model.cats;
    },
    getCurrentCat: function () {
        return model.currentCat;
    },
    setCurrentCat: function (cat) {
        model.currentCat = cat;
    },
    updateCurrentCat : function(cat){
        model.currentCat.name = cat.name;
        model.currentCat.url = cat.url;
        model.currentCat.clickCount = cat.clickCount;
        catView.render();
        catListView.render();
    },
    incrementCounter: function () {
        model.currentCat.clickCount++;
        catView.render();
    }
}


var catView = {
    init: function () {
        this.catImage = document.getElementById("cat-image");
        this.catName = document.getElementById("cat-name");
        this.catClickCount = document.getElementById("click-count");

        this.catImage.addEventListener("click",function(){
            octopus.incrementCounter();
        });
        this.render();
    },
    render: function () {
        var currentCat = octopus.getCurrentCat();
        this.catImage.src = currentCat.url;
        this.catName.innerHTML = currentCat.name;
        this.catClickCount.textContent = "This cat has been clicked " + currentCat.clickCount + " times";        
    }
}


var catListView = {
    init: function () {        
        this.catListElement = document.getElementById("cat-list");
        this.render();
    },
    render: function () {
        var cats = octopus.getAllCats();   
        this.catListElement.innerHTML = "";     
        for(var index in cats) {
            var cat = cats[index];
            var liElement = document.createElement('li');
            liElement.textContent = cat.name;
            liElement.addEventListener('click',(function(cat){
                return function(){
                    octopus.setCurrentCat(cat);
                    catView.render();
                    adminView.hide();
                }                
            })(cat));
            this.catListElement.appendChild(liElement);    
        }
    }
}

var adminView = {
    init: function(){
        
        this.adminButton = document.getElementById("btnadmin");
        this.adminPanel = document.getElementById("admin-panel");
        this.nameInput = document.getElementById("input-cat-name");
        this.imageInput = document.getElementById("input-cat-image");
        this.clickCountInput = document.getElementById("input-click-count");                
        this.saveButton = document.getElementById("btnsave");
        this.cancelButton = document.getElementById("btncancel");

        this.adminButton.addEventListener("click",function(){
            adminView.render();
        });
        this.cancelButton.addEventListener("click",function(){
            adminView.hide();
        });
        this.saveButton.addEventListener("click",function(){
            adminView.saveCatInformation();
            adminView.hide();
        });

        this.hide();
    },
    render:function(){        
        var cat = octopus.getCurrentCat();
        this.nameInput.value = cat.name;
        this.imageInput.value = cat.url;
        this.clickCountInput.value = cat.clickCount;
        this.adminPanel.style.display = "block";
    },
    hide:function(){
        this.adminPanel.style.display = "none";
    },
    saveCatInformation: function(){
        var updatedCat = {};
        updatedCat.name = this.nameInput.value;
        updatedCat.url = this.imageInput.value;
        updatedCat.clickCount = this.clickCountInput.value;
        octopus.updateCurrentCat(updatedCat);        
    }

}

document.addEventListener("DOMContentLoaded", function () {
    //Show cat list
    octopus.init();
});