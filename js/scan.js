<script src="Users/Kevin/COGS-120/COGS120-Web-App/node_modules/quagga/dist/quagga.min.js"></script>

Quagga.init({
    inputStream : {
        name : "Live",
        type : "LiveStream",
         // Or '#yourElement' (optional)
        target: document.querySelector('#scanner-container') 
    },
    decoder : {
        readers : ["code_128_reader"]
    }
}, function(err) {
    if (err) {
        console.log(err);
        return
    }
    console.log("Initialization finished. Ready to start");
    Quagga.start();
});
