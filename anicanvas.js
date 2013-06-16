//Developed by Vacation9, Released into the Public Domain
//Testing version, use anicanvas.min.js for production uses

function Anicanvas(canvas) {
    this.canvasObject = canvas; //actual object (won't need much for our purposes but kept just in case)
    this.context = canvas.getContext('2d'); //this is what we'll be using most often
    this.carray = []; //make array of shapes + text for easy redrawing
    this.addShape = function (properties) {
        this.carray.push({shape: properties["shape"], props: properties});
        AniHandler.redraw(this.context, this.carray);
    }
}

//Anicanvas handler definition (not intended to be used publicly)
var AniHandler =
{
    draw: function(shape, canvas) {
        switch (shape["shape"])
        {
            case "circle":
                canvas.beginPath();
                canvas.arc(shape['props']['x'] || 0, shape['props']['y'] || 0, shape['props']['radius'] || 10, shape['props']['sAngle'] || 0, shape['props']['eAngle'] || 2 * Math.PI, shape['props']['counterclockwise'] || false);
                canvas.fillStyle = shape['fillStyle'] || 'black';
                canvas.fill();
                canvas.lineWidth = shape['lineWidth'] || 5;
                canvas.strokeStyle = shape['strokeStyle'] || 'grey';
                canvas.stroke();
        }
    },
    redraw: function(canvas, carray) {
        canvas.clearRect(0, 0, canvas.width, canvas.height); //clear canvas - so attributes aren't lost, use this method instead of the simpler canvas.width = canvas.width
        for (var i=0; i<carray.length; i++) {
            AniHandler.draw(carray[i], canvas); //for each shape redraw the shape
        }
    }
}