/*
 *
 *           RaphaëlTools : Raphaël extension (button, sliders, ...)
 *
 *                            version 0.9.dev (2014-08-20)
 *
 *                    Copyright (C)  2011 - 2014  Jan Stransky
 *
 *           Czech Technical University, Faculty of Civil Engineering,
 *       Department of Structural Mechanics, 166 29 Prague, Czech Republic
 *
 *  RaphaëlTools is free software: you can redistribute it and/or modify it
 *  under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or (at your
 *  option) any later version.
 *
 *  RaphaëlTools is distributed in the hope that it will be useful, but
 *  WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 *  or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public
 *  License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with this program. If not, see <http://www.gnu.org/licenses/>.
 */


/**
 * @fileOverview <a href="http://raphaeljs.com/">Raphaël</a> (svg javascript library) extension by various functions and "classes" (slider, button, etc.). Requires <a href="http://raphaeljs.com/">raphael.js</a> loaded before loading this file. For more information see <a href="http://mech.fsv.cvut.cz/~stransky/software/raphaeltools/">project homepage</a>.
 <br /><br/>RaphaëlTools is a free software distributed under <a href='http://www.gnu.org/licenses/gpl.html'>GNU GPL license</a>.
 * @author Jan Stránský <http://mech.fsv.cvut.cz/~stransky>
 * @version Version 0.9.dev (2014-08-20)
 */





/** Global namespace object
 * @namespace
 */
var RaphaelTools = {};







/** Generic function used for draging ojects. For each dragable object should be defined function onDragUpdate(dx,dy): e.g. moving only in x direction etc.
 * @param {number} dx x increment of dragging
 * @param {number} dy y increment of dragging
 * @this Raphael.el
 * @example
 * c = RaphaelTools.Circle.create(100,59,20);
 * c.obj.onDragUpdate = function(dx,dy) { c.obj.translate(dx,dy); }
 * c.obj.drag(onDragMove,onDragStart,onDragStop) // make an object draggable using c.onDragUpdate() function when moving
 */
var onDragMove = function(dx,dy) {
    var unit = Raphael.raphaeltoolsDrawingUnit || 1.0;
    this.onDragUpdate(1/unit*(dx - (this.deltax || 0)), 1/unit*(dy - (this.deltay || 0)));
    this.deltax = dx;
    this.deltay = dy;
};

/** Generic function used for draging ojects, see {@link onDragMove}
 * @this Raphael.el
 */
var onDragStart = function() { this.deltax = this.deltay = 0; };

/** Generic function used for draging ojects, see {@link onDragMove}
 * @this Raphael.el
 */
var onDragStop = function() { this.onDragStop(); };


/* ***********************************************************
 * other generic functions
 ************************************************************/


// color setting
/** Sets fill color of receiver to red
 * @this Raphael.el
 */
Raphael.el.fillRed     = function() { return this.attr({"fill":"#f00"}); };
/** Sets fill color of receiver to green
 * @this Raphael.el
 */
Raphael.el.fillGreen   = function() { return this.attr({"fill":"#0f0"}); };
/** Sets fill color of receiver to blue
 * @this Raphael.el
 */
Raphael.el.fillBlue    = function() { return this.attr({"fill":"#00f"}); };
/** Sets fill color of receiver to yellow
 * @this Raphael.el
 */
Raphael.el.fillYellow  = function() { return this.attr({"fill":"#ff0"}); };
/** Sets fill color of receiver to cyan
 * @this Raphael.el
 */
Raphael.el.fillCyan    = function() { return this.attr({"fill":"#0ff"}); };
/** Sets fill color of receiver to magenta
 * @this Raphael.el
 */
Raphael.el.fillMagenta = function() { return this.attr({"fill":"#f0f"}); };
/** Sets fill color of receiver to orange
 * @this Raphael.el
 */
Raphael.el.fillOrange  = function() { return this.attr({"fill":"#f50"}); };
/** Sets fill color of receiver to black
 * @this Raphael.el
 */
Raphael.el.fillBlack   = function() { return this.attr({"fill":"#000"}); };
/** Sets fill color of receiver to white
 * @this Raphael.el
 */
Raphael.el.fillWhite   = function() { return this.attr({"fill":"#fff"}); };
/** Sets fill color of receiver to gray
 * @this Raphael.el
 */
Raphael.el.fillGray    = function() { return this.attr({"fill":"#777"}); };
/** Sets stroke color of receiver to red
 * @this Raphael.el
 */
Raphael.el.strokeRed     = function() { return this.attr({"stroke":"#f00"}); };
/** Sets stroke color of receiver to green
 * @this Raphael.el
 */
Raphael.el.strokeGreen   = function() { return this.attr({"stroke":"#0f0"}); };
/** Sets stroke color of receiver to blue
 * @this Raphael.el
 */
Raphael.el.strokeBlue    = function() { return this.attr({"stroke":"#00f"}); };
/** Sets stroke color of receiver to yellow
 * @this Raphael.el
 */
Raphael.el.strokeYellow  = function() { return this.attr({"stroke":"#ff0"}); };
/** Sets stroke color of receiver to cyan
 * @this Raphael.el
 */
Raphael.el.strokeCyan    = function() { return this.attr({"stroke":"#0ff"}); };
/** Sets stroke color of receiver to magenta
 * @this Raphael.el
 */
Raphael.el.strokeMagenta = function() { return this.attr({"stroke":"#f0f"}); };
/** Sets stroke color of receiver to orange
 * @this Raphael.el
 */
Raphael.el.strokeOrange  = function() { return this.attr({"stroke":"#f50"}); };
/** Sets stroke color of receiver to black
 * @this Raphael.el
 */
Raphael.el.strokeBlack   = function() { return this.attr({"stroke":"#000"}); };
/** Sets stroke color of receiver to white
 * @this Raphael.el
 */
Raphael.el.strokeWhite   = function() { return this.attr({"stroke":"#fff"}); };
/** Sets stroke color of receiver to gray
 * @this Raphael.el
 */
Raphael.el.strokeGray    = function() { return this.attr({"stroke":"#777"}); };
/** Sets fill and stroke color of receiver to red
 * @this Raphael.el
 */
Raphael.el.red     = function() { this.fillRed();     return this.strokeRed(); };
/** Sets fill and stroke color of receiver to green
 * @this Raphael.el
 */
Raphael.el.green   = function() { this.fillGreen();   return this.strokeGreen(); };
/** Sets fill and stroke color of receiver to blue
 * @this Raphael.el
 */
Raphael.el.blue    = function() { this.fillBlue();    return this.strokeBlue(); };
/** Sets fill and stroke color of receiver to yellow
 * @this Raphael.el
 */
Raphael.el.yellow  = function() { this.fillYellow();  return this.strokeYellow(); };
/** Sets fill and stroke color of receiver to cyan
 * @this Raphael.el
 */
Raphael.el.cyan    = function() { this.fillCyan();    return this.strokeCyan(); };
/** Sets fill and stroke color of receiver to magenta
 * @this Raphael.el
 */
Raphael.el.magenta = function() { this.fillMagenta(); return this.strokeMagenta(); };
/** Sets fill and stroke color of receiver to orange
 * @this Raphael.el
 */
Raphael.el.orange  = function() { this.fillOrange();  return this.strokeOrange(); };
/** Sets fill and stroke color of receiver to black
 * @this Raphael.el
 */
Raphael.el.black   = function() { this.fillBlack();   return this.strokeBlack(); };
/** Sets fill and stroke color of receiver to white
 * @this Raphael.el
 */
Raphael.el.white   = function() { this.fillWhite();   return this.strokeWhite(); };
/** Sets fill and stroke color of receiver to gray
 * @this Raphael.el
 */
Raphael.el.gray    = function() { this.fillGray();   return this.strokeGray(); };
/** Sets stroke color of receiver
 * @this Raphael.el
 * @param {string} color new stroke color
 */
Raphael.el.stroke = function(color) { return this.attr({"stroke":color}) };
/** Sets fill color of receiver
 * @this Raphael.el
 * @param {string} color new fill color
 */
Raphael.el.fill   = function(color) { return this.attr({"fill":color}) };
/** Set width of receiver
 * @this Raphael.el
 * @param w new width
 */
Raphael.el.setWidth = function(w) { return this.attr({"stroke-width":w}); }







/** Returns [x,y] components of transformated vector
 * @param {number} x x component of original vector
 * @param {number} y y component of original vector
 * @param {number} sin sin of angle of rotation
 * @param {number} cos cos of angle of rotation
 * @returns {Array.<number>} 2 element array, coordinates of transformated vector
 */
RaphaelTools.vecTrans = function(x,y,sin,cos) { return [x*cos-y*sin,x*sin+y*cos]; }

/** 2d xy plane point implementation
 * @class represents points in 2d xy plane
 * @param {number=} x x coordinate of point
 * @param {number=} y y coordinate of point
 * @property {number} x x coordinate
 * @property {number} y y coordinate
 * @property {Array.<RaphaelTools.Point2d>} copies array of copies of itself
 * @property {Array.<Array.<number>>} copiesShifts array of 2 element arrays, horizontal and verical shifts of copies from receiver
 * @this RaphaelTools.Point2d
 * @constructor
 */
RaphaelTools.Point2d = function(x,y) {
    this.x = x || 0.;
    this.y = y || 0.;
    this.copies = [];
    this.copiesShifts = []
}

/** String representation
 * @returns {string} string representation
 */
RaphaelTools.Point2d.prototype.toString = function() {
    return "Point2d ( "+this.x+","+this.y+" )";
}

/** Copy receiver to given positions
 * @param {Array.<Array.<number>>} shifts array of 2 element arrays, vertical and horizontal shifts of copied points
 * @example n = RaphaelTools.Point2d(100,150);
 * shifts=[[100,200],[200,200],[100,300],[200,300]]
 */
RaphaelTools.Point2d.prototype.copy = function(shifts) {
    for (var i=0; i<shifts.length; i++) {
        this.copiesShifts.push(shifts[i]);
        this.copies.push(RaphaelTools.Point2d.create(this.x+shifts[i][0],this.y+shifts[i][1]));
    }
}

/** Sets new position to receiver
 * @param {number} x x coordinate of new position
 * @param {number} y y coordinate of new position
 */
RaphaelTools.Point2d.prototype.setXY = function(x,y) {
    this.x=x;
    this.y=y;
    this.update();
}

/** Set new x coordinate to receiver
 * @param x x coordinate of new position
 */
RaphaelTools.Point2d.prototype.setX = function(x) {
    this.x=x;
    this.update();
}

/** Set new y coordinate to receiver
 * @param y y coordinate of new position
 */
RaphaelTools.Point2d.prototype.setY = function(y) {
    this.y=y;
    this.update();
}

/** Change position of receiver by given values
 * @param {number} dx length of translation in x direction
 * @param {number} dy length of translation in y direction
 */
RaphaelTools.Point2d.prototype.translate = function(dx,dy) {
    this.x+=dx;
    this.y+=dy;
    this.update();
}

/** Change horizontal position of receiver by given values
 * @param {number} dx length of translation in x direction
 */
RaphaelTools.Point2d.prototype.translateX = function(dx) {
    this.translate(dx,0.);
}

/** Change vertical position of receiver by given values
 * @param {number} dy length of translation in x direction
 */
RaphaelTools.Point2d.prototype.translateY = function(dy) {
    this.translate(0.,dy);
}

/** Update receiver (change positions of stored copies so as stored shifts between receiver and its copies remain constant
 */
RaphaelTools.Point2d.prototype.update = function() {
    for (var i=0; i<this.copies.length; i++) {
        this.copies[i].setXY(this.x+this.copiesShifts[i][0],this.y+this.copiesShifts[i][1]);
        this.copies[i].update();
    }
}

/** Creates new Point2d object, for parameters meaning see {@link RaphaelTools.Point2d}
 * @param {number=} x
 * @param {number=} y
 * @returns {RaphaelTools.Point2d} new Point2d object
 */
RaphaelTools.Point2d.create = function(x,y) {
    var ret = new RaphaelTools.Point2d(x,y);
    ret.update();
    return ret;
}




/** 3d point implementation
 * @class represents points in 3d space
 * @param {number=} xr x coordinate of point in real space
 * @param {number=} yr y coordinate of point in real space
 * @param {number=} zr z coordinate of point in real space
 * @param {Array.<number>=} projection 3x(3 or 4) projection matrix
 * @property {number} xr x coordinate of point in real space
 * @property {number} yr y coordinate of point in real space
 * @property {number} zr z coordinate of point in real space
 * @property {number} x x coordinate of point in screen projection
 * @property {number} y y coordinate of point in screen projection (can be used for visibility issues)
 * @property {number} z z coordinate of point in screen projection
 * @property {Array.<Array.<number>>} p 3x(4 or 3) projection matrix
 * @property {Array.<RaphaelTools.Point3d>} copies array of copies of itself
 * @property {Array.<Array.<number>>} copiesShifts array of 2 element arrays, horizontal and verical shifts of copies from receiver
 * @this RaphaelTools.Point3d
 * @constructor
 */
RaphaelTools.Point3d = function(xr,yr,zr,projection) {
    this.xr = xr || 0;
    this.yr = yr || 0;
    this.zr = zr || 0;
    this.copies = [];
    this.copiesShifts = []
    this.p = projection==undefined? [[1,0,0],[0,1,0],[0,0,1]] : projection;
    this.x = this.p[0][0]*this.xr + this.p[0][1]*this.yr + this.p[0][2]*this.zr + (this.p[0][3] || 0);
    this.y = this.p[1][0]*this.xr + this.p[1][1]*this.yr + this.p[1][2]*this.zr + (this.p[1][3] || 0);
    this.z = this.p[2][0]*this.xr + this.p[2][1]*this.yr + this.p[2][2]*this.zr + (this.p[2][3] || 0);
}

/** String representation
 * @returns {string} string representation
 */
RaphaelTools.Point3d.prototype.toString = function() {
    return "Point3d ( "+this.xr+","+this.yr+","+this.zr+" )";
}

/** Copy receiver to given positions
 * @param {Array.<Array.<number>>} shifts array of 3 element arrays, x,y,z shifts of copied points
 * @example n = RaphaelTools.Point3d(100,150,250);
 * shifts=[[100,200,300],[200,200,500],[100,300,100],[200,300,340]]
 */
RaphaelTools.Point3d.prototype.copy = function(shifts) {
    for (var i=0; i<shifts.length; i++) {
        this.copiesShifts.push(shifts[i]);
        this.copies.push(new RaphaelTools.Point3d(this.xr+shifts[i][0],this.yr+shifts[i][1],this.zr+shifts[i][2]));
    }
}

/** Sets new position to receiver
 * @param {number} xr xr coordinate of new position (in real space)
 * @param {number} yr yr coordinate of new position (in real space)
 * @param {number} zr zr coordinate of new position (in real space)
 */
RaphaelTools.Point3d.prototype.setXYZ = function(xr,yr,zr) {
    this.xr=xr;
    this.yr=yr;
    this.zr=zr;
    this.update();
}

/** Set new x coordinate to receiver
 * @param xr x coordinate of new position (in real space)
 */
RaphaelTools.Point3d.prototype.setX = function(xr) {
    this.xr=xr;
    this.update();
}

/** Set new y coordinate to receiver
 * @param yr y coordinate of new position (in real space)
 */
RaphaelTools.Point3d.prototype.setY = function(yr) {
    this.yr=yr;
    this.update();
}

/** Set new z coordinate to receiver
 * @param zr z coordinate of new position (in real space)
 */
RaphaelTools.Point3d.prototype.setZ = function(zr) {
    this.zr=zr;
    this.update();
}

/** Change position of receiver by given values
 * @param {number} dx length of translation in x direction (in real space)
 * @param {number} dy length of translation in y direction (in real space)
 * @param {number} dz length of translation in z direction (in real space)
 */
RaphaelTools.Point3d.prototype.translate = function(dx,dy,dz) {
    this.xr+=dx;
    this.zr+=dz;
    this.yr+=dy;
    this.update();
}

/** Change horizontal position of receiver by given values
 * @param {number} dx length of translation in x direction (in real space)
 */
RaphaelTools.Point3d.prototype.translateX = function(dx) {
    this.translate(dx,0.,0.);
}

/** Change horizontal position of receiver by given values
 * @param {number} dy length of translation in y direction (in real space)
 */
RaphaelTools.Point3d.prototype.translateY = function(dy) {
    this.translate(0.,dy,0.);
}

/** Change vertical position of receiver by given values
 * @param {number} dz length of translation in x direction (in real space)
 */
RaphaelTools.Point3d.prototype.translateZ = function(dz) {
    this.translate(0.,0.,dz);
}

/** Sets projection matrix
 * @param {Array.<Array.<number>>} p new 3x(3 or 4) projection matrix
 */
RaphaelTools.Point3d.prototype.setProjection = function(p) {
    this.p = p;
    this.update()
}

/** project receiver to xz screen coordinates accordind to this.p
 */
RaphaelTools.Point3d.prototype.project = function() {
    this.x = this.p[0][0]*this.xr + this.p[0][1]*this.yr + this.p[0][2]*this.zr + (this.p[0][3] || 0);
    this.y = this.p[1][0]*this.xr + this.p[1][1]*this.yr + this.p[1][2]*this.zr + (this.p[1][3] || 0);
    this.z = this.p[2][0]*this.xr + this.p[2][1]*this.yr + this.p[2][2]*this.zr + (this.p[2][3] || 0);
}

/** Rotate receiver around x axis of angle a
 * @param {number} a angle of rotation
 */
RaphaelTools.Point3d.prototype.rotX = function(a) {
    var c = Math.cos(a);
    var s = Math.sin(a);
    var p = this.p;
    var p10 = p[1][0], p11 = p[1][1], p12 = p[1][2];
    var p20 = p[2][0], p21 = p[2][1], p22 = p[2][2];
    p[1][0] = p10*c - p20*s;
    p[2][0] = p10*s + p20*c;
    p[1][1] = p11*c - p21*s;
    p[2][1] = p11*s + p21*c;
    p[1][2] = p12*c - p22*s;
    p[2][2] = p12*s + p22*c;
    this.update();
}

/** Rotate receiver around y axis of angle a
 * @param {number} a angle of rotation
 */
RaphaelTools.Point3d.prototype.rotY = function(a) {
    var c = Math.cos(a);
    var s = Math.sin(a);
    var p = this.p;
    var p00 = p[0][0], p01 = p[0][1], p02 = p[0][2];
    var p20 = p[2][0], p21 = p[2][1], p22 = p[2][2];
    p[0][0] = p00*c - p20*s;
    p[2][0] = p00*s + p20*c;
    p[0][1] = p01*c - p21*s;
    p[2][1] = p01*s + p21*c;
    p[0][2] = p02*c - p22*s;
    p[2][2] = p02*s + p22*c;
    this.update();
}

/** Rotate receiver around z axis of angle a
 * @param {number} a angle of rotation
 */
RaphaelTools.Point3d.prototype.rotZ = function(a) {
    var c = Math.cos(a);
    var s = Math.sin(a);
    var p = this.p;
    var p00 = p[0][0], p01 = p[0][1], p02 = p[0][2];
    var p10 = p[1][0], p11 = p[1][1], p12 = p[1][2];
    p[0][0] = p00*c - p10*s;
    p[1][0] = p00*s + p10*c;
    p[0][1] = p01*c - p11*s;
    p[1][1] = p01*s + p11*c;
    p[0][2] = p02*c - p12*s;
    p[1][2] = p02*s + p12*c;
    this.update();
}

/** Update receiver (change positions of stored copies so as stored shifts between receiver and its copies remain constant
 */
RaphaelTools.Point3d.prototype.update = function() {
    this.project();
    for (var i=0; i<this.copies.length; i++) {
        this.copies[i].setXYZ(this.xr+this.copiesShifts[i][0],this.yr+this.copiesShifts[i][1],this.zr+this.copiesShifts[i][2]);
        this.copies[i].update();
    }
}

/** Creates new Point3d object, for parameters meaning see {@link RaphaelTools.Point3d}
 * @returns {RaphaelTools.Point3d} new Point3d object
 */
RaphaelTools.Point3d.create = function(x,y,z,projection) {
    var ret = new RaphaelTools.Point3d(x,y,z,projection);
    ret.update();
    return ret;
}





/** Line segment [Raphael.path]
 * @class represents line segment connecting two points
 * @extends Raphael.fn
 * @param {RaphaelTools.Point2d} point1 1st Point2d
 * @param {RaphaelTools.Point2d} point2 2nd Point2d
 * @param {Object=} attrs attributes passed to Raphael.path().attr(attrs)
 * @property {Point} point1 first point of line
 * @property {Point} point2 second point of line
 * @property {Array.<Raphael.fn.LineSegment>} copies array of copies of receiver
 * @property {Array.<Array.<RaphaelTools.Point2d>>} copiesPoints 2 element arrays of array of points of copies of receiver
 * @this Raphael.fn.LineSegment
 * @constructor
 */
Raphael.fn.LineSegment = function(point1,point2,attrs) {
    attrs = attrs==undefined? {} : attrs;
    /** @alias Raphael.fn.LineSegment.prototype */
    var retLineSegment = this.path().attr(attrs);
    retLineSegment.point1 = point1;
    retLineSegment.point2 = point2;
    retLineSegment.copies = [];
    retLineSegment.copiesPoints = [[],[]];

    /** Update receiver (set this.pathList for given internal variables - x,y,angle... - as well as its copies)
     */
    retLineSegment.update = function() {
        var pathList = [["M",this.point1.x,this.point1.y],["L",this.point2.x,this.point2.y]];
        this.attr({"path":pathList});
        for (var c=0; c<this.copies.length; c++) {
            this.copies[c].update();
        }
    }

    /** Copy receiver
     * @param {Array.<Array.<RaphaelTools.Point2d>>} points 2 element array of array of points points of to be copied lines
     */
    retLineSegment.copy = function(points) { // points=[[point1,point2,point3],[point4,point5,point6]] will make lines 14,25,36
        for (var n=0; n<points[0].length; n++) {
            this.copiesPoints[0].push(points[0][n]);
            this.copiesPoints[1].push(points[1][n]);
            this.copies.push(this.makeCopy(points[0][n],points[1][n]));
        }
        this.update();
    }

    /** Returns copy of receiver
     * @returns {Raphael.fn.LineSegment} copy of receiver
     */
    retLineSegment.makeCopy = function(point1,point2) {
        var ret2 = this.paper.LineSegment(point1,point2);
        ret2.attr(this.attr());
        ret2.update();
        return ret2;
    }

    retLineSegment.update();
    return retLineSegment;
}








/** Line given by ax+by+c=0 clipped in bounding rectangle [Raphael.path]
 * @class represents line given by equation clipped in bounding rectangle
 * @extends Raphael.fn
 * @param {number} a a in ax+by+c=0
 * @param {number} b b in ax+by+c=0
 * @param {number} c c in ax+by+c=0
 * @param {RaphaelTools.Point2d} lt left top corner of bounding rectangle
 * @param {RaphaelTools.Point2d} rb right bottom corner of bounding rectangle (lt.x<rb.x && tl.y<rb.y)
 * @property {number} a a in ax+by+c=0
 * @property {number} b b in ax+by+c=0
 * @property {number} c c in ax+by+c=0
 * @property {Point2d} lt left top corner of bounding rectangle
 * @property {Point2d} rb right bottom corner of bounding rectangle (lt.x<rb.x && tl.y<rb.y)
 * @property {Point2d} point1 1st point of intersection of line with bounding rectangle
 * @property {Point2d} point2 2nd point of intersection of line with bounding rectangle
 * @property {boolean} isOutsideBR if the line is completely outside its bounding rectangle
 * @this Raphael.fn.LineBR
 * @constructor
 */
Raphael.fn.LineBR = function(a,b,c,lt,rb,attrs) {
    attrs = attrs==undefined? {} : attrs;
    /** @alias Raphael.fn.LineBR.prototype */
    var retLineBR = this.path().attr(attrs);
    retLineBR.a = a==undefined? 1. : a;
    retLineBR.b = b==undefined? 1. : b;
    retLineBR.c = c==undefined? 1. : c;
    retLineBR.lt = lt || RaphaelTools.Point2d.create();
    retLineBR.rb = rb || RaphaelTools.Point2d.create();
    retLineBR.point1 = RaphaelTools.Point2d.create();
    retLineBR.point2 = RaphaelTools.Point2d.create();
    retLineBR.isOutsideBR = true;

    /** Sets new a of ax+by+c=0
     *@param {number} a new a in ax+by+c=0
     */
    retLineBR.setABC = function(a,b,c) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.update();
    }

    /** Sets new a of ax+by+c=0
     *@param {number} a new a in ax+by+c=0
     */
    retLineBR.setA = function(a) {
        this.a = a;
        this.update();
    }

    /** Sets new a of ax+by+c=0
     *@param {number} b new a in ax+by+c=0
     */
    retLineBR.setB = function(b) {
        this.b = b;
        this.update();
    }

    /** Sets new a of ax+by+c=0
     *@param {number} c new a in ax+by+c=0
     */
    retLineBR.setC = function(c) {
        this.c = c;
        this.update();
    }

    /** Finds sections of given line with given bounding rectangle and sets to this.points
     */
    retLineBR.findSections = function() {
        var x1,y1,x2,y2;
        var a = this.a;
        var b = this.b;
        var c = this.c;
        var p1 = this.point1;
        var p2 = this.point2;
        var lt = this.lt;
        var rb = this.rb;
        var ymin = lt.y;
        var ymax = rb.y;
        var xmin = lt.x;
        var xmax = rb.x;
        this.show();
        this.isOutsideBR = false;
        if (a == 0.) { // horizontal line
            if (-c/b > ymin && -c/b < ymax) { // line is inside BR
                p1.setXY(xmin,-c/b);
                p2.setXY(xmax,-c/b);
            } else { // line is outside BR
                this.hide();
                this.isOutsideBR = true;
            }
            return;
        }
        if (b == 0.) { // vertical line
            if (-c/a > xmin && -c/a < xmax) { // line is inside BR
                p1.setXY(-c/a,ymin);
                p2.setXY(-c/a,ymax);
            } else { // line is outside BR
                this.hide();
                this.isOutsideBR = true;
            }
            return;
        }
        // the line is inclined
        x1 = xmin;
        x2 = xmax;
        y1 = -(a*x1+c)/b;
        y2 = -(a*x2+c)/b;
        if (y1<ymin && y2<ymin) { // line is all bellow BR
            this.hide();
            this.isOutsideBR = true;
            return;
        }
        if (y1>ymax && y2>ymax) { // line is all above BR
            this.hide();
            this.isOutsideBR = true;
            return;
        }
        if ((y1>ymin && y1<ymax) && (y2>ymin && y2<ymax)) { // line crosses BR from left to right
            p1.setXY(x1,y1);
            p2.setXY(x2,y2);
            return;
        }
        if ((y1<ymin && y2>ymax) || (y1>ymax && y2<ymin)) { // line crosses BR from up to down
            p1.setXY(-(b*ymin+c)/a,ymin);
            p2.setXY(-(b*ymax+c)/a,ymax);
            return;
        }
        if (y1 < ymax && y1 > ymin) { // line crosses left edge of BR
            p1.setXY(x1,y1);
            if (y2 < ymin) { // line crosses top edge of BR
                p2.setXY(-(b*ymin+c)/a,ymin);
            } else { // line crosses bottom edge of BR
                p2.setXY(-(b*ymax+c)/a,ymax);
            }
        } else { // line crosses right edge of BR
            p2.setXY(x2,y2);
            if (y1 < ymin) { // line crosses top edge of BR
                p1.setXY(-(b*ymin+c)/a,ymin);
            } else { // line crosses bottom edge of BR
                p1.setXY(-(b*ymax+c)/a,ymax);
            }
        }
    }

    /** Normalize receiver values (a,b,c) such that (a,b) is unit vector
     */
    retLineBR.normalize = function() {
        if (this.a*this.a + this.b*this.b == 1.) {
            return;
        }
        var n = Math.sqrt(this.a*this.a + this.b*this.b);
        this.a /= n;
        this.b /= n;
        this.c /= n;
    }

    /** Update receiver
     */
    retLineBR.update = function() {
        this.normalize();
        this.findSections();
        var pathList = [["M",this.point1.x,this.point1.y],["L",this.point2.x,this.point2.y]];
        this.attr({"path":pathList});
    }

    retLineBR.update();
    return retLineBR;
}



/** Path (for easier modifying) [Raphael.path]
 * @class represents svg path
 * @extends Raphael.fn
 * @param {Array} pathList path list for raphael path
 * @param {Object=} attrs attributes passed to Raphael.path().attr(attrs)
 * @property {Array} pathList svg array (list) of the object
 * @this Raphael.fn.Path
 * @constructor
 */
Raphael.fn.Path = function(pathList,attrs) {
    attrs = attrs==undefined? {} : attrs;
    /** @alias Raphael.fn.Path.prototype */
    var retPath = this.path(pathList).attr(attrs);
    retPath.pathList = pathList;

    /** Sets one specific value in this.pathList (this.pathList[i][j] = val)
     * @param {number} i first index
     * @param {number} j second index
     * @param {number|string} val value to be set
     */
    retPath.setItem = function(i,j,val) {
        this.pathList[i][j] = val;
        this.update();
    }

    /** Increment one specific value in this.pathList (this.pathList[i][j] = val)
     * @param {number} i first index
     * @param {number} j second index
     * @param {number} val value of incerementation
     */
    retPath.iaddItem = function(i,j,val) {
        this.pathList[i][j] += val;
        this.update();
    }

    /** Sets new svg line path to receiver
     * @param {Array} newPathList newpath list
     */
    retPath.setNewPath = function(newPathList) {
        this.pathList = newPathList;
        this.update();
    }

    /** Updates receiver
     */
    retPath.update = function() {
        this.attr({"path":this.pathList});
    }

    retPath.update();
    return retPath;
}






/** Circle (for easier modifying) [Raphael.circle]
 * @class represents circle
 * @extends Raphael.fn
 * @param {number=} x= 0.] x coordinate of circle center
 * @param {number=} y= 0.] y coordinate of circle center
 * @param {number=} r= 10.] circle radius
 * @param {Object=} attrs attributes passed to Raphael.path(.attr(attrs)
 * @property {number} x x coordinate of circle center
 * @property {number} y y coordinate of circle center
 * @property {number} r radius of the circle
 * @property {Array.<Raphael.fn.Circle>} copies array of copies of receiver
 * @property {Array.<Array.<number>>} copiesShifts array of 2 element arrays, shifts of copies of receiver
 * @this Raphael.fn.Circle
 * @constructor
 */
Raphael.fn.Circle = function(x,y,r,attrs) {
    attrs = attrs==undefined? {} : attrs;
    /** @alias Raphael.fn.Circle.prototype */
    var retCircle = this.circle(x,y,r).attr(attrs);
    retCircle.x = x;
    retCircle.y = y;
    retCircle.r = r;
    retCircle.copies = [];
    retCircle.copiesShifts = [];

    /** Sets radius of receiver
     * @param {number} r new radius
     */
    retCircle.setR = function(r) {
        this.r = r;
        this.update();
    }

    /** Sets new coordinates of receiver
     * @param {number} x new x coordinate
     * @param {number} y new y coordinate
     */
    retCircle.setXYR = function(x,y,r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.update();
    }

    /** Sets new coordinates of receiver
     * @param {number} x new x coordinate
     * @param {number} y new y coordinate
     */
    retCircle.setXY = function(x,y) {
        this.x = x;
        this.y = y;
        this.update();
    }

    /** Sets x coordinate of receiver
     * @param {number} x new x coordinate
     */
    retCircle.setX = function(x) {
        this.x = x;
        this.update();
    }

    /** Sets y coordinate of receiver
     * @param {number} y new y coordinate
     */
    retCircle.setY = function(y) {
        this.y = y;
        this.update();
    }

    /** Translate receiver
     * @param {number} dx x distance of translation
     * @param {number} dy y distance of translation
     */
    retCircle.translate = function(dx,dy) {
        this.x += dx;
        this.y += dy;
        this.update();
    }

    /** Translate along x axis of receiver
     * @param {number} dx x distance of translation
     */
    retCircle.translateX = function(dx) {
        this.translate(dx,0.);
    }

    /** Translate along y axis of receiver
     * @param {number} dy y distance of translation
     */
    retCircle.translateY = function(dy) {
        this.translate(0.,dy);
    }

    /** Copy of receiver
     * @param {Array.<Array.<number>>} shifts array of 2 element array, shifts of copies
     */
    retCircle.copy = function(shifts) {
        for (var i=0; i<shifts.length; i++) {
            this.copiesShifts.push(shifts[i]);
            this.copies.push(this.makeCopy());
        }
        this.update();
    }

    /** Returns copy of receiver
     * @returns {Raphael.fn.Circle} copy of receiver
     */
    retCircle.makeCopy = function() {
        var ret2 = this.paper.Circle(0,0,0);
        ret2.attr(this.attr());
        ret2.update();
        return ret2;
    }

    /** Update
     */
    retCircle.update = function() {
        this.attr({"cx":this.x,"cy":this.y,"r":this.r});
        for (var c=0; c<this.copies.length; c++) {
            this.copies[c].setXYR(this.x+this.copiesShifts[c][0],this.y+this.copiesShifts[c][1],this.r);
        }
    }

    retCircle.update();
    return retCircle;
}





/** Actual slider element - circ
 * @class represents circle to be used as a slider
 * @extends Raphael.fn
 * @param {Object=} attrs parameters passed to raphael.circle.attr
 * @this Raphael.fn.SliderCirc
 * @constructor
 */
Raphael.fn.SliderCirc = function(attrs) {
    attrs = attrs==undefined? {} : attrs;
    var retSliderCirc = this.circle(0,0).attr({"fill":"#f00","r":6,"stroke-width":2,"cursor":"move"});
    retSliderCirc.attr(attrs);

    /** Gets x coodrdinate of receiver
     * @returns {number} x coordinate of receiver
     */
    retSliderCirc.getX = function() { return this.attr("cx"); }
    /** Sets x coodrdinate of receiver
     * @param {number} x new x coordinate
     */
    retSliderCirc.setX = function(x) { this.attr({"cx":x}); }
    /** Gets y coodrdinate of receiver
     * @returns {number} y coordinate of receiver
     */
    retSliderCirc.getY = function() { return this.attr("cy"); }
    /** Sets y coodrdinate of receiver
     * @param {number} y new x coordinate
     */
    retSliderCirc.setY = function(y) { this.attr({"cy":y}); }

    return retSliderCirc;
}

/** Actual slider element - rect
 * @class represents rectangle to be used as a slider
 * @extends Raphael.fn
 * @param {Object=} attrs parameters passed to raphael.rect.attr
 * @this Raphael.fn.SliderRect
 * @constructor
 */
Raphael.fn.SliderRect = function(attrs) {
    attrs = attrs==undefined? {} : attrs;
    var retSliderRect = this.rect(0,0,13,13,3).attr({"fill":"#f00","cursor":"move"}).attr(attrs);

    /** Gets x coodrdinate of receiver
     * @returns {number} x coordinate of receiver
     */
    retSliderRect.getX = function() { return this.attr("x") + .5*this.attr("width"); }
    /** Sets x coodrdinate of receiver
     * @param {number} x new x coordinate
     */
    retSliderRect.setX = function(x) { this.attr({"x":x - .5*this.attr("width")}); }
    /** Gets y coodrdinate of receiver
     * @returns {number} y coordinate of receiver
     */
    retSliderRect.getY = function() { return this.attr("y") + .5*this.attr("height"); }
    /** Sets y coodrdinate of receiver
     * @param {number} y new x coordinate
     */
    retSliderRect.setY = function(y) { this.attr({"y":y - .5*this.attr("height")}); }

    return retSliderRect;
}




/** Slider [Raphael.el]
 * @class abstract class epresenting generic slider
 * @extends Raphael.fn.SliderRect
 * @param {Raphael.el=} slider =SliderCirc] actual slider (must have setX, setX, getY, setY methods)
 * @param {{
				x:number,
				y:number,
				dx:number,
				dy:number,
				val1:number,
				val2:number,
				val3:number,
				val4:number,
				initVal:number,
				gap:number,
				lineAttrs:Object}=} params
 * @param {number} params.x =100.] x coordinate of left-top end
 * @param {number} params.y =100.] y coordinate of left-top end
 * @param {number} params.dx =100.] x dimension of slider [pixels]
 * @param {number} params.dy =0.] y dimension of slider [pixels]
 * @param {number} params.val1 =0.] value when the slider would be at the very beginning
 * @param {number} params.val2 =1.] value when the slider would be at the very end
 * @param {number} params.val3 =val1] extreme beginning value
 * @param {number} params.val4 =val2] extreme end value
 * @param {number} params.initVal =(val1+val2)/2] initial value
 * @param {number} params.gap =10.] gap between end of the slider's line and the slider's circle when the circle is at extreme position
 * @param {Object} params.lineAttrs ={}] attrs passed to line.attr()
 * @param {Object=} params.lineAttrs ={}] attrs passed to slider's line
 * @property {number} x x coordinate of left/upper end
 * @property {number} y y coordinate of left/upper end
 * @property {number} dx x dimension of slider [pixels]
 * @property {number} dy y dimension of slider [pixels]
 * @property {number} cos cos value of the orientation angle
 * @property {number} sin sin value of the orientation angle
 * @property {number} val1 value when the slider is at the very beginning
 * @property {number} val2 value when the slider is at the very end
 * @property {number} val3 extreme beginning value
 * @property {number} val4 extreme end value
 * @property {number} initVal initial value
 * @property {number} gap gap between end of the slider's line and the slider's circle when the circle is at extreme position
 * @property {number} posX
 * @property {number} posY
 * @property {boolean} minFlag
 * @property {boolean} maxFlag
 * @property {number} lenVals length span of getable values
 * @property {Raphael.el} line line
 * @this Raphael.fn.Slider
 * @constructor
 */
Raphael.fn.Slider = function(slider,params) {
    var line = this.path()
    /** @alias Raphael.fn.Slider.prototype */
    var retSlider = slider? slider : this.SliderRect();

    /** What to do when moving. Initially empty function, overwrite it by desired actions
     */
    retSlider.onmove = function() {}

    /** Get current value from receiver
     * @returns {number} current value
     */
    retSlider.getVal = function() {
        var x = this.getX();
        var y = this.getY();
        var pos = Math.sqrt((x-this.x)*(x-this.x) + (y-this.y)*(y-this.y)) - this.start;
        return this.val1 + pos*(this.val2 - this.val1) / this.lenVals;
    }

    /** Set new value to receiver
     * @param {number} newVal new value
     */
    retSlider.setVal = function(newVal) {
        if (newVal < Math.min(this.val3,this.val4)) {
            newVal = Math.min(this.val3,this.val4);
        }
        var newPos = this.start + this.lenVals / (this.val2 - this.val1) * (newVal - this.val1);
        if (newPos < this.start) {
            this.maxFlag = false;
            this.minFlag = true;
            newPos = this.start;
        } else if (newPos > this.stop)  {
            this.maxFlag = true;
            this.minFlag = false;
            newPos = this.stop;
        } else {
            this.maxFlag = this.minFlag = false;
        }
        this.setX(this.x + newPos*this.cos);
        this.setY(this.y + newPos*this.sin);
        this.onDragStop();
    }
    /* **************************/

    params = params || {};
    retSlider.x = params.x==undefined? 100. : params.x;
    retSlider.y = params.y==undefined? 100. : params.y;
    retSlider.dx = params.dx==undefined? 100. : params.dx;
    retSlider.dy = params.dy==undefined?   0. : params.dy;
    retSlider.len = Math.sqrt(retSlider.dx*retSlider.dx + retSlider.dy*retSlider.dy);
    retSlider.cos = retSlider.dx/retSlider.len;
    retSlider.sin = retSlider.dy/retSlider.len;
    var lineAttrs = params.lineAttrs==undefined? {} : params.lineAttrs;
    retSlider.gap = params.gap==undefined? 12. : params.gap;
    retSlider.start = retSlider.gap;
    retSlider.stop = retSlider.len - retSlider.start;
    retSlider.val1 = params.val1==undefined? 0. : params.val1;
    retSlider.val2 = params.val2==undefined? 1. : params.val2;
    retSlider.val3 = params.val3==undefined? retSlider.val1 : params.val3;
    retSlider.val4 = params.val4==undefined? retSlider.val2 : params.val4;
    var initVal = params.initVal==undefined? .5*(retSlider.val1+retSlider.val2) : params.initVal;
    retSlider.lenVals = retSlider.len - 2*retSlider.start;
    retSlider.left = retSlider.start + (retSlider.val3-retSlider.val1)/(retSlider.val2-retSlider.val1)*retSlider.lenVals;
    retSlider.right = retSlider.start + (retSlider.val4-retSlider.val1)/(retSlider.val2-retSlider.val1)*retSlider.lenVals;
    retSlider.line = line.attr({"path":[["M",retSlider.x,retSlider.y],["l",retSlider.dx,retSlider.dy]],"stroke":"#000","stroke-width":7}).attr(lineAttrs);
    retSlider.attr({"cursor":"move"})
    retSlider.onDragStop = function() {
        this.posX = this.getX();
        this.posY = this.getY();
    }
    retSlider.onDragStop();
    retSlider.setVal(initVal)
    retSlider.minFlag = false;
    retSlider.maxFlag = false;
    /** @this Raphael.fn.SliderRect */
    retSlider.onDragUpdate = function(dx,dy) {
        this.posX += dx;
        this.posY += dy;
        var xLoc = (this.posX-this.x)*this.cos + (this.posY-this.y)*this.sin;
        if (xLoc < this.left) {
            if (!this.minFlag) {
                this.setX(this.x + this.left*this.cos);
                this.setY(this.y + this.left*this.sin);
                this.onmove();
            }
            this.minFlag = true;
            this.maxFlag = false;
        } else if (xLoc > this.right) {
            if (!this.maxFlag) {
                this.setX(this.x + (this.right)*this.cos);
                this.setY(this.y + (this.right)*this.sin);
                this.onmove();
            }
            this.minFlag = false;
            this.maxFlag = true;
        } else {
            this.setX(this.x + xLoc*this.cos);
            this.setY(this.y + xLoc*this.sin);
            this.minFlag = false;
            this.maxFlag = false;
            this.onmove();
        }
    }
    retSlider.drag(onDragMove,onDragStart,onDragStop);

    return retSlider;
}





/** TextBox [Raphael.rect]
 * @class represents textbox
 * @extends Raphael.fn
 * @param {{
				x:number,
				y:number,
				width:number,
				height:number,
				str:string,
				rectAttrs:Object,
				textAttrs:Object}=} params
 * @param {number=} params.x =100.] x coordinate of left upper corner [pixel]
 * @param {number=} params.y =100.] y coordinate of left upper corner [pixel]
 * @param {number=} params.width =100.] width [pixel]
 * @param {number=} params.height =100.] height [pixel]
 * @param {string=} params.str ="string"] string to be shown
 * @param {Object=} params.rectAttrs ={}] attrs passed to this.attr
 * @param {Object=} params.textAttrs ={}] attrs passed to this.text.attr
 * @property {number} x x coordinate of top left corner
 * @property {number} y y coordinate of top left corner
 * @property {number} width width of rectangle
 * @property {number} height height of rectangle
 * @property {string} str text to display
 * @property {Raphael.text} text raphael text object
 * @this Raphael.fn.TextBox
 * @constructor
 */
Raphael.fn.TextBox = function(params) {
    params = params || {}
    var x = params.x==undefined? 100. : params.x;
    var y = params.y==undefined? 100. : params.y;
    var width = params.width==undefined? 100. : params.width;
    var height = params.height==undefined? 100. : params.height;

    var str = params.str==undefined? "string" : params.str;
    var rectAttrs = params.rectAttrs==undefined? {} : params.rectAttrs;
    var textAttrs = params.textAttrs==undefined? {} : params.textAttrs;
    /** @alias Raphael.fn.TextBox.prototype */
    var retTextBox = this.rect(x,y,width,height).attr(rectAttrs);
    retTextBox.text = this.text(x+.5*width,y+.5*height,str).attr({"font-size":20}).attr(textAttrs);
    retTextBox.x = x;
    retTextBox.y = y;
    retTextBox.width = width;
    retTextBox.height = height;
    retTextBox.str = str;

    /** Update receiver
     */
    retTextBox.update = function() {
        this.attr({"x":this.x,"y":this.y});
        this.text.attr({"x":(this.x+.5*this.width),"y":(this.y+.5*this.height),"text":this.str});
    }

    /** Sets new x and y position of receiver (this.x = x; this.y = y)
     * @param {number} x new x coordinate [pixel]
     * @param {number} y new y coordinate [pixel]
     */
    retTextBox.setXY = function(x,y) {
        this.x = x;
        this.y = y;
        this.update();
    }

    /** Sets new x position of receiver (this.x = x)
     * @param {number} x new x coordinate [pixel]
     */
    retTextBox.setX = function(x) {
        this.x = x;
        this.update();
    }

    /** Sets new y position of receiver (this.y = y)
     * @param {number} y new y coordinate [pixel]
     */
    retTextBox.setY = function(y) {
        this.y = y;
        this.update();
    }

    /** Sets new text of receiver
     * @param {string} str new string
     */
    retTextBox.setStr = function(str) {
        this.str = str;
        this.update();
    }

    return retTextBox;
}






/** Button [TextBox]
 * @class represents button
 * @extends Raphael.fn.TextBox
 * @param {{
				str:string,
				x:number,
				y:number,
				width:number,
				height:number,
				r:number,
				bgColor:string,
				bgColorWhenClicked:string}=} params
 * @param {string=} params.str ="str"] displayed string of button
 * @param {number=} params.x =100.] x coordinate of left upper end
 * @param {number=} params.y =100.] y coordinate of left upper end
 * @param {number=} params.width =100.] button width [pixels]
 * @param {number=} params.height =30.] button height [pixels]
 * @param {number=} params.r =4.] radius of button corners camber
 * @param {string=} params.bgColor ="#bbb"] background color of button
 * @param {string=} params.bgColorWhenClicked ="#aaa"] background color of button when clicked
 * @property {number} x x coordinate of left upper end
 * @property {number} y y coordinate of left upper end
 * @property {number} width width of button [pixels]
 * @property {number} height height of button [pixels]
 * @property {color} bgColor background color of button
 * @property {color} bgColorWhenClicked background color of button when clicked
 * @property {Raphael.text} text object of receiver
 * @property {Raphael.rect} cover transparent rectangle responsible for clicking events
 * @this Raphael.fn.Button
 * @constructor
 */
Raphael.fn.Button = function(params) {
    if (params.x == undefined) { params.x = 100.; }
    if (params.y == undefined) { params.y = 100.; }
    if (params.width == undefined) { params.width = 100.; }
    if (params.height == undefined) { params.height = 30.; }
    if (params.r == undefined) { params.r = 4.; }
    if (params.bgColor == undefined) { params.bgColor = "#bbb"; }
    if (params.bgColorWhenClicked == undefined) { params.bgColorWhenClicked = "#aaa"; }
    /** @alias Raphael.fn.Button.prototype */
    var retButton = this.TextBox(params);
    var r = params.r==undefined? 4. : params.r;
    retButton.cover = this.rect(retButton.x,retButton.y,retButton.width,retButton.height).attr({"fill":"#000","opacity":0.,"cursor":"pointer"});
    retButton.cover.button = retButton;
    retButton.bgColor = params.bgColor==undefined? "#bbb" : params.bgColor;
    retButton.bgColorWhenClicked = params.bgColorWhenClicked==undefined? "#aaa" : params.bgColorWhenClicked;
    retButton.attr({"r":r,"fill":retButton.bgColor});

    /** What to do when clicked. Initially empty function, overwrite it by desired actions
     */
    retButton.onClick = function() {}

    retButton.doThisWhenClicked = function() {
        this.text.attr({"x":this.x+.5*this.width+2})
        this.attr({"fill":this.bgColorWhenClicked})
        this.onClick();
    }

    retButton.doThisWhenUnclicked = function() {
        this.text.attr({"x":this.x+.5*this.width})
        this.attr({"fill":this.bgColor})
    }

    retButton.cover.mousedown(function(event) {this.button.doThisWhenClicked();})
    retButton.cover.mouseup(function(event)   {this.button.doThisWhenUnclicked();})
    retButton.cover.mouseout(function(event)  {this.button.doThisWhenUnclicked();})

    return retButton;
}





/** Legend
 * @class represents legend
 * @param {Raphael.Paper} paper rapheal instance
 * @param {Array} what array of [string,color,width,attrs] arrays. attrs is passed to rapheal.path
 * @param {Object=} params parameters of legend
 * @param {number=} params.x =0.] x coordinate of left upper corner [pixel]
 * @param {number=} params.y =0.] y coordinate of left upper corner [pixel]
 * @param {number=} params.len =120.] length of legend lines
 * @param {number=} params.fontSize =20.] font size of labels
 * @param {number=} params.dy =30.] y difference between individual lines
 * @this RaphaelTools.Legend
 * @constructor
 */
RaphaelTools.Legend = function(paper,what,params) {
    this.x = params.x==undefined? 0. : params.x;
    this.y = params.y==undefined? 0. : params.y;
    this.len = params.len==undefined? 100. : params.len;
    this.fontSize = params.fontSize==undefined? 15 : params.fontSize;
    this.dy = params.dy==undefined? 30 : params.dy;
    var label, color, width, t, attrs;
    var y = this.y;
    for (var i=0; i<what.length; i++) {
        label = what[i][0];
        color = what[i].length>1? what[i][1] : "#000";
        width = what[i].length>2? what[i][2] : 1.;
        attrs = what[i].length>3? what[i][3] : {};
        attrs["stroke-width"] = width;
        attrs["stroke"] = color;
        paper.path([["M",this.x,y],["l",this.len,0]]).attr(attrs);
        paper.text(this.x+this.len+20,y,label).attr({"font-size":this.fontSize,"text-anchor":"start"});
        y += this.dy
    }
}

/** Creates new Legend object, for parameters meaning see {@link RaphaelTools.Legend}
 * @returns {RaphaelTools.Legend} new Legend object
 */
RaphaelTools.Legend.create = function(paper,what,params) {
    var ret = new RaphaelTools.Legend(paper,what,params);
    return ret;
}






/** Check box [Raphael.rect]
 * @class represents check box
 * @extends Raphael.fn
 * @param {{
				x:number,
				y:number,
				dim:number,
				isChecked:boolean,
				rectAttrs:Object,
				pathAttrs:Object}=} params
 * @param {boolean=} params.isChecked =false] if box is checked
 * @param {Object=} params.rectAttrs ={}] box (rectangle) attrs passed to this.attr
 * @param {Object=} params.pathAttrs ={}] path (check) attrs passed to this.path.attr
 * @param {number=} params.x =100.] x coordinate of left upper corner [pixel]
 * @param {number=} params.y =100.] y coordinate of left upper corner [pixel]
 * @param {number=} params.dim =20.] dimension of the box [pixel]
 * @param {boolean=} params.isChecked =false] if box is checked
 * @param {Object=} params.rectAttrs ={}] box (rectangle) attrs passed to this.attr
 * @param {Object=} params.pathAttrs ={}] path (check) attrs passed to this.path.attr
 * @property {number} x x coordinate of top left corner
 * @property {number} y y coordinate of top left corner
 * @property {number} dim size of rectangle
 * @property {Raphael.path} path check path
 * @property {boolean} isChecked if box is checked
 * @this Raphael.fn.CheckBox
 * @constructor
 */
Raphael.fn.CheckBox = function(params) {
    params = params==undefined? {} : params;
    var x = params.x==undefined? 100. : params.x;
    var y = params.y==undefined? 100. : params.y;
    var dim = params.dim==undefined? 20. : params.dim;
    var isChecked = params.isChecked==undefined? false : params.isChecked;
    var rectAttrs = params.rectAttrs==undefined? {} : params.rectAttrs;
    var pathAttrs = params.pathAttrs==undefined? {} : params.pathAttrs;
    /** @alias Raphael.fn.CheckBox.prototype */
    var retCheckBox = this.rect(x,y,dim,dim).attr({"stroke-width":2,"fill":"#fff"}).attr(rectAttrs);
    retCheckBox.x = x;
    retCheckBox.y = y;
    retCheckBox.dim = dim;
    retCheckBox.isChecked = isChecked;
    retCheckBox.path = this.path([
        ["M",retCheckBox.x+.2*retCheckBox.dim,retCheckBox.y+.4*retCheckBox.dim],
        ["l",.2*retCheckBox.dim,.3*retCheckBox.dim],
        ["l",.4*retCheckBox.dim,-.5*retCheckBox.dim]
    ]).attr({"stroke-width":3}).attr(pathAttrs);
    if (!retCheckBox.isChecked) { retCheckBox.path.hide(); }
    //
    retCheckBox.cover = this.rect(x,y,dim,dim).attr({"fill":"#000","opacity":.0,"cursor":"pointer"})
    retCheckBox.cover.checkBox = retCheckBox;
    retCheckBox.cover.click(function() {
        this.checkBox.check(!this.checkBox.isChecked);
        this.checkBox.onChange();
    });

    /* * Update receiver
     ret.update = function() {
     }
     */

    /**
     * What to do when the box state is changed. Initially empty function
     */
    retCheckBox.onChange = function() {}

    /** Check (or uncheck) receiver
     * @param {boolean=} b =true] bool value to be set
     */
    retCheckBox.check = function(b) {
        b = b==undefined? true : b;
        if (b) {
            this.path.show();
            this.isChecked = true;
        } else {
            this.path.hide();
            this.isChecked = false;
        }
    }

    /** Uncheck receiver
     */
    retCheckBox.uncheck = function() {
        this.check(false);
    }

    return retCheckBox;
}

