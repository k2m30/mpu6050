/*
*
*             Raphaël3d : Raphaël extension for basic 3d graphics           
*                                                                             
*                          version 0.9.dev (2014-08-20)
*  
*                    Copyright (C)  2013 - 2014  Jan Stransky                 
*  
*           Czech Technical University, Faculty of Civil Engineering,         
*       Department of Structural Mechanics, 166 29 Prague, Czech Republic     
*  
*  Raphaël3d is free software: you can redistribute it and/or modify it under
*  the terms of the GNU Lesser General Public License as published by the Free
*  Software Foundation, either version 3 of the License, or (at your option)
*  any later version.
*  
*  Raphaël3d is distributed in the hope that it will be useful, but WITHOUT
*  ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
*  FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License
*  for more details.
*  
*  You should have received a copy of the GNU Lesser General Public License
*  along with this program. If not, see <http://www.gnu.org/licenses/>.
*/


/**
* @fileOverview <a href="http://raphaeljs.com/">Raphaël</a> (svg javascript library) extension for basic 3d graphics. Requires <a href="http://raphaeljs.com/">raphael.js</a> loaded before loading this file. For more information see <a href="http://mech.fsv.cvut.cz/~stransky/software/raphael3d/">project homepage</a>.
<br /><br/>This project (naming etc.) is inspired by <a href="https://code.google.com/p/jsc3d/">JSC3D library</a>
<br /><br/>Raphaël3d is a free software distributed under <a href='http://www.gnu.org/licenses/gpl.html'>GNU GPL license</a>.
* @author <a href="http://mech.fsv.cvut.cz/~stransky/">Jan Stránský</a>
* @version Version 0.9.dev (2014-08-20)
*/




/** Global namespace object
* @namespace
*/
var Raphael3d = {
	TOL: 1e-9
};


/** Reset given matrix to identity
* @private
* @param {Raphael3d.Matrix4x4} m matrix to be changed to identity
*/
Raphael3d.__setIdentityMatrix4x4 = function(m) {
	m.m00 = 1.; m.m01 = 0.; m.m02 = 0.; m.m03 = 0.;
	m.m10 = 0.; m.m11 = 1.; m.m12 = 0.; m.m13 = 0.;
	m.m20 = 0.; m.m21 = 0.; m.m22 = 1.; m.m23 = 0.;
	m.m30 = 0.; m.m31 = 0.; m.m32 = 0.; m.m33 = 1.;
}

/** Checks if given object is covered by another object (i.e. if another object is present in user defined isCoveredBy array attribute)
* @param {Raphael3d.Edge|Raphael3d.Face|Raphael3d.Surface} t
* @param {Raphael3d.Edge|Raphael3d.Face|Raphael3d.Surface} b
* @private
* @returns {boolean}
*/
Raphael3d.__isCoveredBy = function(t,b) {
	var nc = t.coveredByList.length;
	for (var i=0; i<nc; i++) {
		if (t.coveredByList[i] == b) {
			return true;
		}
	}
	return false;
}





/** 4x4 transformation matrix
* @class represents 4x4 transformation matrix
* @property {number} m00 (0,0) element
* @property {number} m01 (0,1) element
* @property {number} m02 (0,2) element
* @property {number} m03 (0,3) element
* @property {number} m10 (1,0) element
* @property {number} m11 (1,1) element
* @property {number} m12 (1,2) element
* @property {number} m13 (1,3) element
* @property {number} m20 (2,0) element
* @property {number} m21 (2,1) element
* @property {number} m22 (2,2) element
* @property {number} m23 (2,3) element
* @property {number} m30 (3,0) element
* @property {number} m31 (3,1) element
* @property {number} m32 (3,2) element
* @property {number} m33 (3,3) element
* @property {number} m40 (4,0) element
* @property {number} m41 (4,1) element
* @property {number} m42 (4,2) element
* @property {number} m43 (4,3) element
* @this Raphael3d.Matrix4x4
* @constructor
*/
Raphael3d.Matrix4x4 = function() {
	Raphael3d.__setIdentityMatrix4x4(this);
}

/**
* @returns {Raphael3d.Matrix4x4} new Matrix4x4 object
*/
Raphael3d.Matrix4x4.create = function() {
	return new Raphael3d.Matrix4x4();
}

/** String representation of matrix
* @returns {string} string representation
*/
Raphael3d.Matrix4x4.prototype.toString = function() {
	var ret =  
	'Matrix4x4( ' + this.m00 + ', ' + this.m01 + ', ' + this.m02 + ', ' + this.m03 + ';\n' +
	'           ' + this.m10 + ', ' + this.m11 + ', ' + this.m12 + ', ' + this.m13 + ';\n' +
	'           ' + this.m20 + ', ' + this.m21 + ', ' + this.m22 + ', ' + this.m23 + ';\n' +
	'           ' + this.m30 + ', ' + this.m31 + ', ' + this.m32 + ', ' + this.m33 + ')';
	return ret;
}

/** Changes receiver to be identity matrix
* @return {Raphael3d.Matrix4x4} receiver
*/
Raphael3d.Matrix4x4.prototype.beIdentity = function() {
	Raphael3d.__setIdentityMatrix4x4(this);
	return this;
}

/** Changes receiver to be copy of given matrix
* @param {Raphael3d.Matrix4x4} m matrix to be copied to receiver
* @return {Raphael3d.Matrix4x4} receiver
*/
Raphael3d.Matrix4x4.prototype.beCopyOf = function(m) {
	this.m00 = m.m00; this.m01 = m.m01; this.m02 = m.m02; this.m03 = m.m03;
	this.m10 = m.m10; this.m11 = m.m11; this.m12 = m.m12; this.m13 = m.m13;
	this.m20 = m.m20; this.m21 = m.m21; this.m22 = m.m22; this.m23 = m.m23;
	this.m30 = m.m30; this.m31 = m.m31; this.m32 = m.m32; this.m33 = m.m33;
	return this;
}

/** Returns copy of receiver
* @return {Raphael3d.Matrix4x4} new copied matrix
*/
Raphael3d.Matrix4x4.prototype.copy = function() {
	var ret = new Raphael3d.Matrix4x4();
	ret.m00 = this.m00; ret.m01 = this.m01; ret.m02 = this.m02; ret.m03 = this.m03;
	ret.m10 = this.m10; ret.m11 = this.m11; ret.m12 = this.m12; ret.m13 = this.m13;
	ret.m20 = this.m20; ret.m21 = this.m21; ret.m22 = this.m22; ret.m23 = this.m23;
	ret.m30 = this.m30; ret.m31 = this.m31; ret.m32 = this.m32; ret.m33 = this.m33;
	return ret;
}

/** Multiply receiver by given matrix from left (!). Changes receiver (!)
* @param {Raphael3d.Matrix4x4=} m 
* @return {Raphael3d.Matrix4x4} receiver
*/
Raphael3d.Matrix4x4.prototype.mul = function(m) {
	if (!m) {
		return this;
	}
	var m00 = m.m00*this.m00 + m.m01*this.m10 + m.m02*this.m20 + m.m03*this.m30;
	var m01 = m.m00*this.m01 + m.m01*this.m11 + m.m02*this.m21 + m.m03*this.m31;
	var m02 = m.m00*this.m02 + m.m01*this.m12 + m.m02*this.m22 + m.m03*this.m32;
	var m03 = m.m00*this.m03 + m.m01*this.m13 + m.m02*this.m23 + m.m03*this.m33;
	var m10 = m.m10*this.m00 + m.m11*this.m10 + m.m12*this.m20 + m.m13*this.m30;
	var m11 = m.m10*this.m01 + m.m11*this.m11 + m.m12*this.m21 + m.m13*this.m31;
	var m12 = m.m10*this.m02 + m.m11*this.m12 + m.m12*this.m22 + m.m13*this.m32;
	var m13 = m.m10*this.m03 + m.m11*this.m13 + m.m12*this.m23 + m.m13*this.m33;
	var m20 = m.m20*this.m00 + m.m21*this.m10 + m.m22*this.m20 + m.m23*this.m30;
	var m21 = m.m20*this.m01 + m.m21*this.m11 + m.m22*this.m21 + m.m23*this.m31;
	var m22 = m.m20*this.m02 + m.m21*this.m12 + m.m22*this.m22 + m.m23*this.m32;
	var m23 = m.m20*this.m03 + m.m21*this.m13 + m.m22*this.m23 + m.m23*this.m33;
	var m30 = m.m30*this.m00 + m.m31*this.m10 + m.m32*this.m20 + m.m33*this.m30;
	var m31 = m.m30*this.m01 + m.m31*this.m11 + m.m32*this.m21 + m.m33*this.m31;
	var m32 = m.m30*this.m02 + m.m31*this.m12 + m.m32*this.m22 + m.m33*this.m32;
	var m33 = m.m30*this.m03 + m.m31*this.m13 + m.m32*this.m23 + m.m33*this.m33;
	//
	this.m00 = m00; this.m01 = m01; this.m02 = m02; this.m03 = m03;
	this.m10 = m10; this.m11 = m11; this.m12 = m12; this.m13 = m13;
	this.m20 = m20; this.m21 = m21; this.m22 = m22; this.m23 = m23;
	this.m30 = m30; this.m31 = m31; this.m32 = m32; this.m33 = m33;
	//
	return this;
}


/** Perform translation on receiver. Changes receiver (!)
* @param {number} tx translation in x direction
* @param {number} ty translation in y direction
* @param {number} tz translation in z direction
* @returns {Raphael3d.Matrix4x4} changed receiver
*/
Raphael3d.Matrix4x4.prototype.translate = function(tx,ty,tz) {
	this.mul( Raphael3d.Matrix4x4.TranslationMatrix(tx,ty,tz) );
	return this;
}

/** Perform scale transformation on receiver. Changes receiver (!)
* @param {number} sx scale in x direction
* @param {number} sy scale in y direction
* @param {number} sz scale in z direction
* @returns {Raphael3d.Matrix4x4} changed receiver
*/
Raphael3d.Matrix4x4.prototype.scale = function(sx,sy,sz) {
	this.mul( Raphael3d.Matrix4x4.ScaleMatrix(sx,sy,sz) );
	return this;
}

/** Performs zoom trensofrmation (scale transformation with equal scale factor in all directions). Changes receiver (!)
* @param {number} factor zoom factor
* @returns {Raphael3d.Matrix4x4} changed receiver
*/
Raphael3d.Matrix4x4.prototype.zoom = function(factor) {
	this.mul( Raphael3d.Matrix4x4.ZoomMatrix(factor) );
	return this;
}

/** Performs shear transformation. Changes receiver (!)
* @param {number} shxy xy plane shear factor
* @param {number} shyz yz plane shear factor
* @param {number} shzx zx plane shear factor
* @returns {Raphael3d.Matrix4x4} changed receiver
*/
Raphael3d.Matrix4x4.prototype.shear = function(shxy,shyz,shzx) {
	this.mul( Raphael3d.Matrix4x4.ShearMatrix(shxy,shyz,shzx) );
	return this;
}

/** Perform rotation of receiver about x axis and given angle. Changes receiver (!)
* @param {number} angle angle of rotation
* @param {Raphael3d.Vector3=} center center of rotation
* @returns {Raphael3d.Matrix4x4} changed receiver
*/
Raphael3d.Matrix4x4.prototype.rotateX = function(angle,center) {
	this.mul( Raphael3d.Matrix4x4.RotationXMatrix(angle,center) );
	return this;
}

/** Perform rotation of receiver about y axis and given angle. Changes receiver (!)
* @param {number} angle angle of rotation
* @param {Raphael3d.Vector3=} center center of rotation
* @returns {Raphael3d.Matrix4x4} changed receiver
*/
Raphael3d.Matrix4x4.prototype.rotateY = function(angle,center) {
	this.mul( Raphael3d.Matrix4x4.RotationYMatrix(angle,center) );
	return this;
}

/** Perform rotation of receiver about z axis and given angle. Changes receiver (!)
* @param {number} angle angle of rotation
* @param {Raphael3d.Vector3=} center center of rotation
* @returns {Raphael3d.Matrix4x4} changed receiver
*/
Raphael3d.Matrix4x4.prototype.rotateZ = function(angle,center) {
	this.mul( Raphael3d.Matrix4x4.RotationZMatrix(angle,center) );
	return this;
}

/** Perform rotation of receiver about arbitrary axis and given angle. Changes receiver (!)
* @param {Raphael3d.Vector3} axis unit vector of rotation axis
* @param {number} angle angle of rotation
* @param {Raphael3d.Vector3=} center center of rotation
* @returns {Raphael3d.Matrix4x4} changed receiver
*/
Raphael3d.Matrix4x4.prototype.rotate = function(axis,angle,center) {
	this.mul( Raphael3d.Matrix4x4.RotationMatrix(axis,angle,center) );
	return this;
}

/** Returns new ientity matrix
* @returns {Raphael3d.Matrix4x4} new identity matrix
*/
Raphael3d.Matrix4x4.Identity = function() {
	return new Raphael3d.Matrix4x4();
}

/** Returns new translation matrix
* @param {number} tx translation in x direction
* @param {number} ty translation in y direction
* @param {number} tz translation in z direction
* @returns {Raphael3d.Matrix4x4} new translation matrix
*/
Raphael3d.Matrix4x4.TranslationMatrix = function(tx,ty,tz) {
	var ret = Raphael3d.Matrix4x4.Identity();
	ret.m03 = tx;
	ret.m13 = ty;
	ret.m23 = tz;
	return ret;
}

/** Returns new rotation matrix (about x axis)
* @param {number} alpha angle of rotation
* @param {Raphael3d.Vector3=} center center of rotation
* @returns {Raphael3d.Matrix4x4} new rotation matrix about x axis
*/
Raphael3d.Matrix4x4.RotationXMatrix = function(alpha,center) {
	var ret = Raphael3d.Matrix4x4.Identity();
	var c = Math.cos(alpha), s = Math.sin(alpha)
	ret.m11 =  c;
	ret.m12 = -s;
	ret.m21 =  s;
	ret.m22 =  c;
	if (center) {
		ret = Raphael3d.Matrix4x4.TranslationMatrix(-center.x,-center.y,-center.z).mul(ret).mul(Raphael3d.Matrix4x4.TranslationMatrix(center.x,center.y,center.z));
	}
	return ret;
}

/** Returns new rotation matrix (about y axis)
* @param {number} alpha angle of rotation
* @param {Raphael3d.Vector3=} center center of rotation
* @returns {Raphael3d.Matrix4x4} new rotation matrix about y axis
*/
Raphael3d.Matrix4x4.RotationYMatrix = function(alpha,center) {
	var ret = Raphael3d.Matrix4x4.Identity();
	var c = Math.cos(alpha), s = Math.sin(alpha)
	ret.m00 =  c;
	ret.m02 = -s;
	ret.m20 =  s;
	ret.m22 =  c;
	if (center) {
		ret = Raphael3d.Matrix4x4.TranslationMatrix(-center.x,-center.y,-center.z).mul(ret).mul(Raphael3d.Matrix4x4.TranslationMatrix(center.x,center.y,center.z));
	}
	return ret;
}

/** Returns new rotation matrix (about z axis)
* @param {number} alpha angle of rotation
* @param {Raphael3d.Vector3=} center center of rotation
* @returns {Raphael3d.Matrix4x4} new rotation matrix about z axis
*/
Raphael3d.Matrix4x4.RotationZMatrix = function(alpha,center) {
	var ret = Raphael3d.Matrix4x4.Identity();
	var c = Math.cos(alpha), s = Math.sin(alpha)
	ret.m00 =  c;
	ret.m01 = -s;
	ret.m10 =  s;
	ret.m11 =  c;
	if (center) {
		ret = Raphael3d.Matrix4x4.TranslationMatrix(-center.x,-center.y,-center.z).mul(ret).mul(Raphael3d.Matrix4x4.TranslationMatrix(center.x,center.y,center.z));
	}
	return ret;
}

/** Returns new rotation matrix (about arbitrary axis)
* @param {Raphael3d.Vector3} axis unit vector of rotation axis
* @param {number} alpha angle of rotation
* @param {Raphael3d.Vector3=} center center of rotation
* @returns {Raphael3d.Matrix4x4} new rotation matrix
*/
Raphael3d.Matrix4x4.RotationMatrix = function(axis,alpha,center) {
	var ret = Raphael3d.Matrix4x4.Identity();
	var c = Math.cos(alpha), s = Math.sin(alpha), cc = 1-c;
	var ax = axis.x, ay = axis.y, az = axis.z;
	ret.m00 = c + cc*ax*ax       ;
	ret.m01 =     cc*ax*ay - s*az;
	ret.m02 =     cc*ax*az + s*ay;
	ret.m10 =     cc*ay*ax + s*az;
	ret.m11 = c + cc*ay*ay       ;
	ret.m12 =     cc*ay*az - s*ax;
	ret.m20 =     cc*az*ax - s*ay;
	ret.m21 =     cc*az*ay + s*ax;
	ret.m22 = c + cc*az*az       ;
	if (center) {
		ret = Raphael3d.Matrix4x4.TranslationMatrix(-center.x,-center.y,-center.z).mul(ret).mul(Raphael3d.Matrix4x4.TranslationMatrix(center.x,center.y,center.z));
	}
	return ret;
}

/** Returns new scale matrix
* @param {number} sx scale factor in x direction
* @param {number} sy scale factor in y direction
* @param {number} sz scale factor in z direction
* @returns {Raphael3d.Matrix4x4} new scale matrix
*/
Raphael3d.Matrix4x4.ScaleMatrix = function(sx,sy,sz) {
	var ret = Raphael3d.Matrix4x4.Identity();
	ret.m00 = sx;
	ret.m11 = sy;
	ret.m22 = sz;
	return ret;
}

/** Returns new zoom matrix (scale matrix with equal factor in all directions)
* @returns {Raphael3d.Matrix4x4} new scale matrix
*/
Raphael3d.Matrix4x4.ZoomMatrix = function(factor) {
	return Raphael3d.Matrix4x4.ScaleMatrix(factor,factor,factor);
}

/** Returns new shear matrix
* @param {number} shxy shear angle in xy plane
* @param {number} shyz shear angle in yz plane
* @param {number} shzx shear angle in zx plane
* @returns {Raphael3d.Matrix4x4} new shear matrix
*/
Raphael3d.Matrix4x4.ShearMatrix = function(shxy,shyz,shzx) {
	var ret = Raphael3d.Matrix4x4.Identity();
	ret.m01 = ret.m10 = .5*shxy;
	ret.m12 = ret.m21 = .5*shyz;
	ret.m20 = ret.m02 = .5*shzx;
	return ret;
}

/** Creates perspective matrix scaling z depth
* @param {number} z0 perspactive factor (inf -> parallel projection)
* @returns {Raphael3d.Matrix4x4} new perspective matrix
*/

Raphael3d.Matrix4x4.PerspectiveMatrixZ = function(z0) {
	var ret = Raphael3d.Matrix4x4.Identity();
	ret.m32 = 1/z0;
	return ret;
}

/* TODO
Raphael3d.Matrix4x4.PerspectiveMatrix = function(x0,y0,z0) {
	var ret = Raphael3d.Matrix4x4.Identity();
	if (x0) { ret.m30 = 1/x0; }
	if (y0) { ret.m31 = 1/y0; }
	if (z0) { ret.m32 = 1/z0; }
	return ret;
}

Raphael3d.Matrix4x4.MongeMatrix = function(plane,value) {
	var ret = Raphael3d.Matrix4x4.Identity();
	plane = plane || 'xy';
	value = value || 0.;
	if (plane == 'xz' || plane == 'zx') {
		ret.m13 = value;
	} else if (plane == 'yz' || plane == 'zy') {
		ret.m03 = value;
	} else { // 'xy'
		ret.m23 = value;
	}
	return ret;
}

Raphael3d.Matrix4x4.IsometricMatrix = function(alpha) {
	return Raphael3d.Matrix4x4.AxonometricMatrix(1.,1.,alpha,alpha);
}

Raphael3d.Matrix4x4.DimetricMatrix = function(jz,alpha) {
	return Raphael3d.Matrix4x4.AxonometricMatrix(1.,jz,alpha,alpha);
}

Raphael3d.Matrix4x4.UnifiedProjectionMatrix = function(zp,copDir,copDist) {
	var ret = Raphael3d.Matrix4x4.Identity();
	var dx = copDir.x, dy = copDir.y, dz = copDir.z, q = copDist;
	ret.m02 = -dx/dz; ret.m03 = zp*dx/dz;
	ret.m12 = -dx/dy; ret.m03 = zp*dy/dz;
	ret.m23 = zp*zp/q/dz + zp;
	ret.m32 = -1./q/dz; ret.m33 = zp/q/dz + 1;
	return ret;
}
*/


/** Vector3 implementation
* @class representrs Euclidean vector
* @param {number=} x x coordinate
* @param {number=} y y coordinate
* @param {number=} z z coordinate
* @property {number} x x coordinate
* @property {number} y y coordinate
* @property {number} z z coordinate
* @this Raphael3d.Vector3
* @constructor
*/
Raphael3d.Vector3 = function(x,y,z) {
	this.x = x || 0.;
	this.y = y || 0.;
	this.z = z || 0.;
}

/** Creates new Vector3 instance
* @param {number=} x x coordinate
* @param {number=} y y coordinate
* @param {number=} z z coordinate
* @return {Raphael3d.Vector3}
*/
Raphael3d.Vector3.create = function(x,y,z) {
	return new Raphael3d.Vector3(x,y,z);
}

/** Returns sum of receiver and another Vector3
* @param {Raphael3d.Vector3|Raphael3d.Vertex} v
* @return {Raphael3d.Vector3} sum of receiver and v
*/
Raphael3d.Vector3.prototype.add = function(v) {
	return new Raphael3d.Vector3(this.x+v.x, this.y+v.y, this.z+v.z);
}

/** Returns difference of receiver and another Vector3
* @param {Raphael3d.Vector3|Raphael3d.Vertex} v
* @return {Raphael3d.Vector3} difference of receiver and v
*/
Raphael3d.Vector3.prototype.sub = function(v) {
	return new Raphael3d.Vector3(this.x-v.x, this.y-v.y, this.z-v.z);
}

/** Returns dot product of receiver and another vector
* @param {Raphael3d.Vector3|Raphael3d.Vertex} v
* @return {number} dot product of receiver and v
*/
Raphael3d.Vector3.prototype.dot = function(v) {
	return this.x*v.x + this.y*v.y + this.z*v.z;
}

/** Returns (Euclidean) norm of receiver
* @return {number} norm of receiver
*/
Raphael3d.Vector3.prototype.norm = function() {
	return Math.sqrt( this.dot(this) );
}

/** Returns cross product of receiver and another vector
* @param {Raphael3d.Vector3|Raphael3d.Vertex} v
* @return {Raphael3d.Vector3} cross product of receiver and v
*/
Raphael3d.Vector3.prototype.cross = function(v) {
	return new Raphael3d.Vector3(
		this.y*v.z - this.z*v.y,
		this.z*v.x - this.x*v.z,
		this.x*v.y - this.y*v.x
	);
}

/** Normalize receiver
*/
Raphael3d.Vector3.prototype.normalize = function() {
	var n = this.norm();
	this.x /= n;
	this.y /= n;
	this.z /= n;
}

/** Copy another Vector3 to receiver. Changes receiver
* @param {Raphael3d.Vector3|Raphael3d.Vertex} v
* @return {Raphael3d.Vector3} changed receiver (now equal to v)
*/
Raphael3d.Vector3.prototype.beCopyOf = function(v) {
	this.x = v.x;
	this.y = v.y;
	this.z = v.z;
	return this;
}

/** Copy receiver
* @return {Raphael3d.Vector3} copied receiver
*/
Raphael3d.Vector3.prototype.copy = function() {
	return new Raphael3d.Vector3(this.x,this.y,this.z);
}

/** Returns string representation of receiver
* @return {string} copied receiver
*/
Raphael3d.Vector3.prototype.toString = function() {
	return 'Vector3( ' + this.x + ', ' + this.y + ', ' + this.z + ' )'
}

/** Checks equality of receiver with another Vector3
* @param {Raphael3d.Vector3|Raphael3d.Vertex} v
* @return {boolean} true if receiver and v equals, false otherwise
*/
Raphael3d.Vector3.prototype.isEqualTo = function(v) {
	return Math.abs(this.x-v.x) < Raphael3d.TOL && Math.abs(this.y-v.y) < Raphael3d.TOL && Math.abs(this.z-v.z) < Raphael3d.TOL;
}

/** Sets coordinates to receiver and returns it
* @param {number} x new x coordinate
* @param {number} y new y coordinate
* @param {number} z new z coordinate
* @return {Raphael3d.Vector3} changed receiver
*/
Raphael3d.Vector3.prototype.setCoordinates = function(x,y,z) {
	this.x = x;
	this.y = y;
	this.z = z;
	return this;
}


/** Returns unit Vector3 in x direction
* @return {Raphael3d.Vector3} x unit vector
*/
Raphael3d.Vector3.UnitX = function() {
	return new Raphael3d.Vector3(1,0,0);
}

/** Returns unit Vector3 in y direction
* @return {Raphael3d.Vector3} y unit vector
*/
Raphael3d.Vector3.UnitY = function() {
	return new Raphael3d.Vector3(0,1,0);
}

/** Returns unit Vector3 in z direction
* @return {Raphael3d.Vector3} z unit vector
*/
Raphael3d.Vector3.UnitZ = function() {
	return new Raphael3d.Vector3(0,0,1);
}






/** Vertex implementation
* @class represents vertex
* @param {number=} x x coordinat (real)
* @param {number=} y z coordinat (real)
* @param {number=} z z coordinat (real)
* @property {number} x x coordinat (real)
* @property {number} y y coordinat (real)
* @property {number} z z coordinat (real)
* @property {Raphael3d.Vector3} projected projected position
* @property {Array.<Raphael3d.Edge>} edges array if edges
* @property {Array.<Raphael3d.Face>} faces array if faces
* @this Raphael3d.Vertex
* @constructor
*/
Raphael3d.Vertex = function(x,y,z) {
	Raphael3d.Vector3.call(this,x,y,z);
	this.projected = new Raphael3d.Vector3(this.x,this.y,this.z);
	this.edges = [];
	this.faces = [];
}
Raphael3d.Vertex.prototype.__type = 'Vertex';

/** Creates new Vertex object
* @param {number=} x x coordinat (real)
* @param {number=} y z coordinat (real)
* @param {number=} z z coordinat (real)
* @returns {Raphael3d.Vertex} new Vertex objects
*/
Raphael3d.Vertex.create = function(x,y,z) {
	return new Raphael3d.Vertex(x,y,z);
}

/** Vertex sum, see {@link Raphael3d.Vertex#add} */
Raphael3d.Vertex.prototype.add = Raphael3d.Vector3.prototype.add;
/** Vertex difference, see {@link Raphael3d.Vertex#sub} */
Raphael3d.Vertex.prototype.sub = Raphael3d.Vector3.prototype.sub;
/** Vertex dot product, see {@link Raphael3d.Vertex#dot} */
Raphael3d.Vertex.prototype.dot = Raphael3d.Vector3.prototype.dot;
/** Vertex cross product, see {@link Raphael3d.Vertex#cross} */
Raphael3d.Vertex.prototype.cross = Raphael3d.Vector3.prototype.cross;
/** Vertex equality check, see {@link Raphael3d.Vertex#isEqualTo} */
Raphael3d.Vertex.prototype.isEqualTo = Raphael3d.Vector3.prototype.isEqualTo;
/** Vertex new coordinates, see {@link Raphael3d.Vertex#setCoordinates} */
Raphael3d.Vertex.prototype.setCoordinates = Raphael3d.Vector3.prototype.setCoordinates;

/** Transforms receiver according to given matrix (i.e. change real coordinates of receiver)
* @param {Raphael3d.Matrix4x4=} m transformation matrix
*/
Raphael3d.Vertex.prototype.transform = function(m) {
	if (!m) { return; }
	var x,y,z,w;
	if (m) {
		x = m.m00*this.x + m.m01*this.y + m.m02*this.z + m.m03;
		y = m.m10*this.x + m.m11*this.y + m.m12*this.z + m.m13;
		z = m.m20*this.x + m.m21*this.y + m.m22*this.z + m.m23;
		w = m.m30*this.x + m.m31*this.y + m.m32*this.z + m.m33;
	} else {
		x = this.x;
		y = this.y;
		z = this.z;
		w = 1.;
	}
	this.x = x/w;
	this.y = y/w;
	this.z = z/w;
}

/** Project receiver according to given matrix (i.e. does not change real coordinates, only Vertex.projected attribute)
* @param {Raphael3d.Matrix4x4=} m transformation matrix
*/
Raphael3d.Vertex.prototype.project = function(m) {
	var x,y,z,w;
	if (m) {
		x = m.m00*this.x + m.m01*this.y + m.m02*this.z + m.m03;
		y = m.m10*this.x + m.m11*this.y + m.m12*this.z + m.m13;
		z = m.m20*this.x + m.m21*this.y + m.m22*this.z + m.m23;
		w = m.m30*this.x + m.m31*this.y + m.m32*this.z + m.m33;
	} else {
		x = this.x;
		y = this.y;
		z = this.z;
		w = 1.;
	}
	this.projected.x = x/w;
	this.projected.y = y/w;
	this.projected.z = z/w;
}

/** Gives array of neighbors of receiver (connected with edges)
* @returns {Array.<Raphael3d.Vertex>} array on neighboring vertices
*/
Raphael3d.Vertex.prototype.giveNeighbors = function() {
	var ret = [];
	var ne = this.edges.length;
	for (var i=0; i<ne; i++) {
		ret.push( this.edges[i].give2ndVertex(this) );
	}
	return ret;
}

/** Checks if receiver is neighbor of given Vertex
* @param {Raphael3d.Vertex} v vertex to be checked
* @returns {boolean} true if receiver and v are neighbors, false otherwise
*/
Raphael3d.Vertex.prototype.isNeighborOf = function(v) {
	var ne = this.edges.length, e;
	for (var i=0; i<ne; i++) {
		e = this.edges[i];
		if (v == e.v1 || v == e.v2) {
			return true;
		}
	}
	return false;
}

/** Gives common edge with given Vertex
* @param {Raphael3d.Vertex} v vertex to be checked
* @returns {Raphael3d.Edge|null} common edge if exists, null otherwise
*/
Raphael3d.Vertex.prototype.giveCommonEdgeWith = function(v) {
	var ne = this.edges.length, e;
	for (var i=0; i<ne; i++) {
		e = this.edges[i];
		if (v == e.v1 || v == e.v2) {
			return e;
		}
	}
	return null;
}

/** Returns existing edge between receiver and v, or creates new Edge and returns it
* @param {Raphael3d.Vertex} v vertex to be connected
* @param {Raphael.Paper} paper paper instance
* @param {Object=} attrs attrs to be passed to Edge constructor
* @returns {Raphael3d.Edge} existing or newly created Edge between receiver and v
*/
Raphael3d.Vertex.prototype.connectWith = function(v,paper,attrs) {
	var ret = this.giveCommonEdgeWith(v);
	if (ret === null) {
		ret = new Raphael3d.Edge(this,v,paper,attrs);
	}
	return ret;
}

/** Computes distance from receiver to passed face (assuming face is planar)
* @param {Raphael3d.Face} f face whose distance will be computed
* @param {boolean} updateFace update face before computation
* @returns {number} distance from receiver to given face
*/
Raphael3d.Vertex.prototype.computeDistFromFace = function(f,updateFace) {
	if (updateFace) { f.update(); }
	var fn = f.normal,
		v = f.vertices[0],
		c = this.sub(v),
		ret = c.dot(fn);
	return ret;
}

/** Computes squared distance from receiver to another Vertex or Vector3
* @param {Raphael3d.Vertex|Raphael3d.Vector3} v point whose squared distance from receiver will be computed
* @returns {number} squared distance from receiver to given point
*/
Raphael3d.Vertex.prototype.computeSqrDistFromVertex = function(v) {
	var d = this.sub(v);
	return d.dot(d);
}

/** Computes distance from receiver to another Vertex or Vector3
* @param {Raphael3d.Vertex|Raphael3d.Vector3} v point whose distance from receiver will be computed
* @returns {number} distance from receiver to given point
*/
Raphael3d.Vertex.prototype.computeDistFromVertex = function(v) {
	return Math.sqrt(this.computeSqrDistFromVertex(v));
}

/** Copies coordinates from given Vector3 object to receiver, returns modified receiver
* @param {Raphael3d.Vector3} v
* @returns {Raphael3d.Vertex} modified receiver
*/
Raphael3d.Vertex.prototype.fromVector3 = function(v) {
	this.x = v.x;
	this.y = v.y;
	this.z = v.z;
	this.projected.beCopyOf(v);
	return this;
}

/** Returns new Vertex object from given Vector3 object
* @param {Raphael3d.Vector3} v
* @returns {Raphael3d.Vertex} new Vertex object
*/
Raphael3d.Vertex.FromVector3 = function(v) {
	return new Raphael3d.Vertex().fromVector3(v);
}





/** Edge implementation
* @class represents edge connecting 2 Vertex instances
* @param {Raphael3d.Vertex} v1 1st vertex
* @param {Raphael3d.Vertex} v2 2nd vertex
* @param {Raphael.Paper=} paper raphael paper instance
* @param {Object=} attrs attrs passed to paper.path.attr
* @property {Raphael3d.Vertex} v1 1st vertex
* @property {Raphael3d.Vertex} v2 2nd vertex
* @property {Raphael.el} path paper.path instance
* @property {Array.<Raphael3d.Face>} faces array of faces this belongs to
* @property {boolean} isBoundary if receiver is on visibility boundary
* @property {boolean} isBackFace if receiver is on back face
* @property {Raphael3d.AABB} aabb receiver's axis aligned bounding box
* @property {Raphael3d.AABB} aabbProjected aabb of receiver's projection
* @property {Array} coveredByList list of objects receiver is covered by (defined by the user)
* @this Raphael3d.Edge
* @constructor
*/
Raphael3d.Edge = function(v1,v2,paper,attrs) {
	this.v1 = v1;
	this.v2 = v2;
	v1.edges.push(this);
	v2.edges.push(this);
	this.path = (paper && attrs)? paper.path().attr({"stroke-width":0}).attr(attrs) : null;
	this.faces = [];
	this.isBoundary = false;
	this.isBackFace = false;
	this.aabb = null;
	this.aabbProjected = null;
	this.coveredByList = [];
}
Raphael3d.Edge.prototype.__type = 'Edge';

/** Creates new Edge object, see {@link Raphael3d.Edge}
* @param {Raphael3d.Vertex} v1
* @param {Raphael3d.Vertex} v2
* @param {Raphael.Paper=} paper
* @param {Object=} attrs
* @returns {Raphael3d.Edge} new Edge instance
*/
Raphael3d.Edge.create = function(v1,v2,paper,attrs) {
	return new Raphael3d.Edge(v1,v2,paper,attrs);
}

/** Updates receiver (isBackFace and isBoundary attributes)
* @returns {Raphael3d.Edge} updated receiver
*/
Raphael3d.Edge.prototype.update = function() {
	var f = this.faces
	this.isBoundary = f.length == 2 && ( (f[0].isBackFace && !f[1].isBackFace) || (!f[0].isBackFace && f[1].isBackFace) );
	this.isBackFace = f.length == 2 && (f[0].isBackFace && f[1].isBackFace);
	return this;
}

/** Computes squared length of receiver
* @returns {number} squared length of receiver
*/
Raphael3d.Edge.prototype.computeLengthSqr = function() {
	var d = this.v2.sub(this.v1);
	return d.dot(d);
}

/** Computes length of receiver
* @returns {number} length of receiver
*/
Raphael3d.Edge.prototype.computeLength = function() {
	return Math.sqrt(this.computeLengthSqr);
}

/** Computes squared length of receiver's projection
* @returns {number} squared length of receiver's projection
*/
Raphael3d.Edge.prototype.computeProjectedLengthSqr = function() {
	var d = this.v2.projected.sub(this.v1.projected)
	return d.x*d.x + d.y*d.y;
}

/** Computes length of receiver's projection
* @returns {number} length of receiver's projection
*/
Raphael3d.Edge.prototype.computeProjectedLength = function() {
	return Math.sqrt(this.computeProjectedLengthSqr);
}

/** Checks if receiver's projection is parallel to Z axis
* @returns {boolean} true is receiver's projection is parallel to Z axis, false otherwise
*/
Raphael3d.Edge.prototype.isProjectedZParallel = function() {
	var v1 = this.v1.projected, v2 = this.v2.projected, t = Raphael3d.TOL;
	return Math.abs(v1.x-v2.x) < t && Math.abs(v1.y-v2.y) < t;
}

/** Render receiver (update raphael path)
*/
Raphael3d.Edge.prototype.render = function() {
	if (!this.path) { return; }
	this.path.attr({"path":[
		"M",this.v1.projected.x, this.v1.projected.y,
		"L",this.v2.projected.x, this.v2.projected.y
	]});
}

/** Returns the other vertex of receiver than the argunemt
* @param {Raphael3d.Vertex} v a vertex
* @returns {Raphael3d.Vertex} the other vertex
*/
Raphael3d.Edge.prototype.give2ndVertex = function(v) {
	if (v == this.v1) {
		return this.v2;
	} else if (v == this.v2) {
		return this.v1;
	}
	return null;
}

/** Returns array of edges have 1 vertex in common with receiver
* @returns {Array.<Raphael3d.Edge>} array of neighboring edges
*/
Raphael3d.Edge.prototype.giveNeighbors = function() {
	var ret1 = this.v1.edges.slice(0);
	var l = ret1.length;
	for (var i=0; i<l; i++) {
		if (ret1[i] == this) {
			break;
		}
	}
	ret1.splice(i,1);
	var ret2 = this.v1.edges.slice(0);
	l = ret2.length;
	for (var i=0; i<l; i++) {
		if (ret2[i] == this) {
			break;
		}
	}
	ret2.splice(i,1);
	return ret1.concat(ret2);
}

/** Checks if receiver is a neighbor of given edge (if they have common vertex)
* @param {Raphael3d.Edge} e given edge
* @returns {boolean} true in case of common vertex, false otherwise
*/
Raphael3d.Edge.prototype.isNeighborOf = function(e) {
	var l = this.v1.edges.length;
	for (var i=0; i<l; i++) {
		if (this.v1.edges[i] == e) {
			return true;
		}
	}
	l = this.v2.edges.length;
	for (var i=0; i<l; i++) {
		if (this.v2.edges[i] == e) {
			return true;
		}
	}
	return false;
}

/** Transforsm receiver (i.e. change real coordinates of vertices) according to given matrix
* @param {Raphael3d.Matrix4x4} m transformation matrix
* @returns {Raphael3d.Edge} transformed receiver
*/
Raphael3d.Edge.prototype.transform = function(m) {
	this.v1.transform(m);
	this.v2.transform(m);
	return this;
}

/** Project receiver (i.e. change projected coordinates of vertices) according to given matrix
* @param {Raphael3d.Matrix4x4} m transformation matrix
* @returns {Raphael3d.Edge} projected receiver
*/
Raphael3d.Edge.prototype.project = function(m) {
	if (!m) { return this; }
	this.v1.project(m);
	this.v2.project(m);
	return this;
}

/** Updates AABB (axis aligned bounding box) of receiver
* @returns {Raphael3d.Edge} receiver
*/
Raphael3d.Edge.prototype.updateAABB = function() {
	if (!this.aabb || !this.aabbProjected) {
		this.aabb = new Raphael3d.AABB();
		this.aabbProjected = new Raphael3d.AABB();
	}
	var v1 = this.v1, v2 = this.v2,
		minX = Math.min(v1.x,v2.x),
		minY = Math.min(v1.y,v2.y),
		minZ = Math.min(v1.z,v2.z),
		maxX = Math.max(v1.x,v2.x),
		maxY = Math.max(v1.y,v2.y),
		maxZ = Math.max(v1.z,v2.z);
	this.aabb.setVals(minX,minY,minZ, maxX,maxY,maxZ);
	v1 = v1.projected;
	v2 = this.v2.projected;
	minX = Math.min(v1.x,v2.x);
	minY = Math.min(v1.y,v2.y);
	minZ = Math.min(v1.z,v2.z);
	maxX = Math.max(v1.x,v2.x);
	maxY = Math.max(v1.y,v2.y);
	maxZ = Math.max(v1.z,v2.z);
	this.aabbProjected.setVals(minX,minY,minZ, maxX,maxY,maxZ);
	return this;
}

/** Checks if receiver is covered by given object (i.e. if the given object is present in initially empty coveredByList attribute, filled by the user)
* @param {Raphael3d.Edge|Raphael3d.Face|Raphael3d.Surface} b given object
* @returns {boolean} true if receiver is covered by given object, false otherwise
*/
Raphael3d.Edge.prototype.isCoveredBy = function(b) {
	return Raphael3d.__isCoveredBy(this,b);
}

/** Computes if projection of receiver is in front of given object
* @param {Raphael3d.Edge|Raphael3d.Face|Raphael3d.Surface} b given object
* @returns {boolean} true if projection of receiver is in front of given object, false otherwise
* @private
*/
Raphael3d.Edge.prototype.isInFrontOf = function(b) {
	var pos;
	if (b.__type == 'Edge') {
		pos = this.isInFrontOfEdge(b);
	}
	if (b.__type == 'Face') {
		pos = this.isInFrontOfFace(b);
	}
	if (b.__type == 'Surface') {
		pos = this.isInFrontOfSurface(b);
	}
	return pos==1? true : false;
}

/** Checks if projection of receiver is in front of given Edge
* @param {Raphael3d.Edge} edge given edge for check
* @returns {number}
							0: for no overlap or totally same edge,
							1: if receiver in front of edge, 
							-1: if edge in front of receiver
* @private
*/
Raphael3d.Edge.prototype.isInFrontOfEdge = function(edge) {
	var a = this.v1.projected, b = this.v2.projected, c = edge.v1.projected, d = edge.v2.projected;
	if (a.isEqualTo(c) || a.isEqualTo(d) || b.isEqualTo(c) || b.isEqualTo(d)) {
		return 0;
	}
	var ba = {x:b.x-a.x, y:b.y-a.y, z:b.z-a.z}, dc = {x:d.x-c.x, y:d.y-c.y, z:d.z-c.z};
	// finds xy intersection
	var bax = b.x - a.x, bay = b.y - a.y, baz = b.z - a.z;
	var dcx = d.x - c.x, dcy = d.y - c.y, dcz = d.z - c.z;
	var intrsctn = Raphael3d.Geom.compute2dEdgeEdgeIntersection(a,ba,c,dc);
	if (!intrsctn) { return 0; }
	if (intrsctn.parallel) {
		return 0;
	}
	var t = intrsctn.param1, s = intrsctn.param2;
	if (t<0. || t>1. || s<0. || s>1.) {
		return 0;
	}
	var zab = a.z + t*ba.z;
	var zcd = c.z + s*dc.z;
	var dz = zab - zcd;
	if (dz < -Raphael3d.TOL) { return 1; }
	if (dz > Raphael3d.TOL) { return -1; }
	return 0;
}

/** Checks if projection of receiver is in front of given face
* @param {Raphael3d.Face} face given edge for check
* @returns {number}
							0: for no overlap of projections
							1: if receiver in front of face, 
							-1: if face in front of receiver
* @private
*/
Raphael3d.Edge.prototype.isInFrontOfFace = function(face) {
	var v1 = this.v1, v2 = this.v2;
	var ret = -face.isInFrontOfVertex(v1);
	if (ret) { return ret; }
	ret = -face.isInFrontOfVertex(v2);
	if (ret) { return ret; }
	var edges = face.edges, ne = edges.length, e, pos;
	ret = 0;
	for (var i=0; i<ne; i++) {
		e = edges[i];
		pos = this.isInFrontOfEdge(e);
		ret += pos;
	}
	if (ret > 0) { return 1; }
	if (ret < 0) { return -1; }
	return 0;
}

/** Checks if projection of receiver is in front of given surface
* @param {Raphael3d.Surface} surface given edge for check
* @returns {number}
							0: for no overlap of projections
							1: if receiver in front of surface, 
							-1: if surface in front of receiver
* @private
*/
Raphael3d.Edge.prototype.isInFrontOfSurface = function(surface) {
	var faces = surface.faces, nf = faces.length, pos, ret=0, edges, ne, e;
	for (var i=0; i<nf; i++) {
		pos = this.isInFrontOfFace(faces[i]);
		ret += pos;
	}
	if (ret > 0) { return 1; }
	if (ret < 0) { return -1; }
	return 0;
}






/** Face implementation (the assumption is that face is planar)
* @class represents face composed of vertices connected by edges
* @param {Array.<Raphael3d.Vertex>} vertices array of vertices of the face
* @param {Raphael.Paper=} paper raphael paper instance
* @param {Object=} attrs attrs passed to paper.path.attr
* @param {Object=} edgeAttrs passed to edge.path.attr
* @property {Array.<Raphael3d.Vertex>} vertices array of vertices of the face
* @property {Array.<Raphael3d.Edge>} edges array of edges connecting face's vertices
* @property {Raphael.el} path paper.path instance
* @property {Raphael3d.Material} material material of receiver
* @property {Raphael3d.Vector3} normal real normal vector
* @property {Raphael3d.Vector3} projectedNormal projected normal vector
* @property {string} actual color of the face
* @property {number} transparency transparency of receiver (from 0 to 1)
* @property {boolean} isDoubleSided if receiver is double sided. If yes, it is rendered always, if not, only whan projectedNormal has positive z cordinate
* @property {Raphael3d.AABB} aabb receiver's axis aligned bounding box
* @property {Raphael3d.AABB} aabbProjected aabb of receiver's projection
* @property {Array} coveredByList list of objects receiver is covered by (defined by the user)
* @this Raphael3d.Face
* @constructor
*/
Raphael3d.Face = function(vertices,paper,attrs,edgeAttrs) {
	this.vertices = vertices===undefined? [] : vertices.slice();
	var nv = this.vertices.length-1;
	this.edges = new Array(nv+1);
	for (var i=0; i<nv; i++) {
		this.edges[i] = this.vertices[i].connectWith(this.vertices[i+1],paper,edgeAttrs);
		this.vertices[i].faces.push(this);
		this.edges[i].faces.push(this);
	}
	this.edges[nv] = this.vertices[nv].connectWith(this.vertices[0],paper,edgeAttrs);
	this.vertices[nv].faces.push(this);
	this.edges[nv].faces.push(this);
	this.path = (paper && attrs)? paper.path().attr({"stroke-width":0}).attr(attrs) : null;
	this.isBackFace = false;
	this.material = null;
	this.normal = new Raphael3d.Vector3(NaN,NaN,NaN);
	this.projectedNormal = new Raphael3d.Vector3(NaN,NaN,NaN);
	this.color = null;
	this.transparency = 0.;
	this.isDoubleSided = true;
	this.aabb = null;
	this.aabbProjected = null;
	this.coveredByList = [];
}
Raphael3d.Face.prototype.__type = 'Face';

/** Create new Face object, see {@link Raphael3d.Face} for arguments
* @param {Array.<Raphael3d.Vertex>} vertices
* @param {Raphael.Paper=} paper
* @param {Object=} attrs
* @param {Object=} edgeAttrs
* @returns {Raphael3d.Face} new Face objects
*/
Raphael3d.Face.create = function(vertices,paper,attrs,edgeAttrs) {
	return new Raphael3d.Face(vertices,paper,attrs,edgeAttrs);
}

/** Checks if projection of receiver is parallel to z axis
* @returns {boolean}
*/
Raphael3d.Face.prototype.isProjectedZParallel = function() {
	return Math.abs(this.projectedNormal.z) < Raphael3d.TOL;
}

/** Updates receiver = update edges, computes normal, projectedNormal, sets color, isBackFace attributes
* @param {Raphael3d.Material=} material material for color computations
*/
Raphael3d.Face.prototype.update = function(material) {
	this.computeNormal();
	this.computeProjectedNormal();
	material = this.material || material;
	if (material) {
		this.color = material.computeColor(-this.projectedNormal.z);
		this.transparency = material.transparency;
	}
	this.isBackFace = this.projectedNormal.z > 0. ? true : false;
	var edges = this.edges, ne = edges.length;
	for (var i=0; i<ne; i++) {
		edges[i].update();
	}
}

/** Renders receiver (update paper.path)
*/
Raphael3d.Face.prototype.render = function() {
	if (!this.path) { return; }
	var nv = this.vertices.length;
	var path = new Array(3*nv+1);
	path[0] = "M";
	path[1] = this.vertices[0].projected.x;
	path[2] = this.vertices[0].projected.y;
	path[3*nv] = "Z";
	for (var i=1; i<nv; i++) {
		path[3*i] = "L";
		path[3*i+1] = this.vertices[i].projected.x;
		path[3*i+2] = this.vertices[i].projected.y;
	}
	var attrs = {"path":path, "opacity":1.-this.transparency};
	if (this.color) {
		attrs.fill = this.color;
	}
	this.path.attr(attrs);
	var edges = this.edges, ne = edges.length, e;
	for (var i=0; i<ne; i++) {
		e = edges[i]
		if (!e.path) { continue; }
		e.path.insertBefore(this.path);
		e.render();
	}
}

/** Computes and updates normal of the receiver
* @returns {Raphael3d.Vector3} updated normal
*/
Raphael3d.Face.prototype.computeNormal = function() {
	var v1 = this.vertices[0];
	var v2 = this.vertices[1];
	var v3 = this.vertices[this.vertices.length-1];
	var ret =  v2.sub(v1).cross(v3.sub(v1));
	ret.normalize();
	this.normal = ret;
	return ret;
}

/** Computes and updates projected normal of the receiver
* @returns {Raphael3d.Vector3} updated normal
*/
Raphael3d.Face.prototype.computeProjectedNormal = function() {
	var v1 = this.vertices[0].projected;
	var v2 = this.vertices[1].projected;
	var v3 = this.vertices[this.vertices.length-1].projected;
	var ret =  v2.sub(v1).cross(v3.sub(v1));
	ret.normalize();
	this.projectedNormal = ret;
	return ret;
}

/** Sets new material to the receiver
* @param {Raphael3d.Material} material new material
* @returns {Raphael3d.Face} receiver
*/
Raphael3d.Face.prototype.setMaterial = function(material) {
	this.material = material;
	return this;
}

/** Transforms receiver (i.e. updates real coordinates of vertices) according to given matrix
* @param {Raphael3d.Matrix4x4} m transformation matrix
* @returns {Raphael3d.Face} receiver
*/
Raphael3d.Face.prototype.transform = function(m) {
	var nv = this.vertices.length;
	for (var i=0; i<nv; i++) {
		this.vertices[i].transform(m);
	}
	return this;
}

/** Project receiver (i.e. updates projected coordinates of vertices) according to given matrix
* @param {Raphael3d.Matrix4x4} m projection matrix
* @returns {Raphael3d.Face} receiver
*/
Raphael3d.Face.prototype.project = function(m) {
	if (!m) { return this; }
	var nv = this.vertices.length;
	for (var i=0; i<nv; i++) {
		this.vertices[i].project(m);
	}
	return this;
}

/** Updates AABB (axis aligned bounding box) of the receiver
*/
Raphael3d.Face.prototype.updateAABB = function() {
	if (!this.aabb || !this.aabbProjected) {
		this.aabb = new Raphael3d.AABB();
		this.aabbProjected = new Raphael3d.AABB();
	}
	var vertices = this.vertices, nv = vertices.length,
		minX, minY, minZ,
		maxX, maxY, maxZ,
		x, y, z, v;
	minX = minY = minZ = Number.POSITIVE_INFINITY;
	maxX = maxY = maxZ = Number.NEGATIVE_INFINITY;
	for (var j=0; j<nv; j++) {
		v = vertices[j];
		x = v.x;
		y = v.y;
		z = v.z;
		minX = Math.min(x,minX);
		minY = Math.min(y,minY);
		minZ = Math.min(z,minZ);
		maxX = Math.max(x,maxX);
		maxY = Math.max(y,maxY);
		maxZ = Math.max(z,maxZ);
	}
	this.aabb.setVals(minX,minY,minZ, maxX,maxY,maxZ);
	minX = minY = minZ = Number.POSITIVE_INFINITY;
	maxX = maxY = maxZ = Number.NEGATIVE_INFINITY;
	for (var j=0; j<nv; j++) {
		v = vertices[j].projected;
		x = v.x;
		y = v.y;
		z = v.z;
		minX = Math.min(x,minX);
		minY = Math.min(y,minY);
		minZ = Math.min(z,minZ);
		maxX = Math.max(x,maxX);
		maxY = Math.max(y,maxY);
		maxZ = Math.max(z,maxZ);
	}
	this.aabbProjected.setVals(minX,minY,minZ, maxX,maxY,maxZ);
}

/** Checks if receiver is covered by given object (i.e. if the given object is present in initially empty coveredByList attribute, filled by the user)
* @param {Raphael3d.Edge|Raphael3d.Face|Raphael3d.Surface} b given object
* @returns {boolean} true if receiver is covered by given object, false otherwise
*/
Raphael3d.Face.prototype.isCoveredBy = function(b) {
	return Raphael3d.__isCoveredBy(this,b);
}

/** Checks if projection of receiver contains given xy coordinates
* @param {number} x x coordinate to test
* @param {number} y y coordinate to test
* @returns {boolean}
*/
Raphael3d.Face.prototype.projectionContainsCoords = function(x,y) {
	var ux, uy;
	/*
	do {
		ux = Math.random();
		uy = Math.random();
	} while (Math.abs(ux) > .1 && Math.abs(uy) > .1);
	*/
	ux = .6525422454245; uy = .325365745522162;
	var line = new Raphael3d.Geom.OrientedLine2d({x:x,y:y},{x:ux,y:uy});
	var edges = this.edges, ne = edges.length;
	var ni = 0;
	for (var i=0; i<ne; i++) {
		if (line.hasIntersectionWithProjEdge(edges[i])) {
			ni += 1;
		}
	}
	return (ni % 2) != 0;
} 


/** Checks if projection of receiver contains projection if given vertex
* @param {Raphael3d.Vertex} v given vertex
* @returns {boolean}
*/
Raphael3d.Face.prototype.projectionContainsVertex = function(v) {
	var x = v.projected.x, y = v.projected.y;
	return this.projectionContainsCoords(x,y);
}

/** Computes if projection of receiver is in front of given object
* @param {Raphael3d.Edge|Raphael3d.Face|Raphael3d.Surface} b given object
* @returns {boolean} true if projection of receiver is in front of given object, false otherwise
* @private
*/
Raphael3d.Face.prototype.isInFrontOf = function(b) {
	var pos;
	if (b.__type == 'Edge') {
		return b.isInFrontOfFace(this) == -1 ? true : false;
	}
	if (b.__type == 'Face') {
		pos = this.isInFrontOfFace(b);
	}
	if (b.__type == 'Surface') {
		pos = this.isInFrontOfSurface(b);
	}
	return pos==1? true : false;
}

/** Computes if projection of receiver is in front of given Vertex
* @param {Raphael3d.Vertex} vertex given object
* @returns {number}
							0: for no overlap of projections
							1: if receiver in front of vertex, 
							-1: if vertex in front of receiver
* @private
*/
Raphael3d.Face.prototype.isInFrontOfVertex = function(vertex) {
	var vv = vertex.projected;
	var v, vertices = this.vertices, nv = vertices.length, v1 = this.vertices[0].projected;
	var n = this.projectedNormal;
	for (var i=0; i<nv; i++) {
		if (vertices[i].isEqualTo(vertex)) {
			return 0;
		}
	}
	if (!this.projectionContainsVertex(vertex)) {
		return 0;
	}
	var p = Raphael3d.temp.plane;
	p.fromFace(this)
	if (p.containsPoint(vertex)) {
		return 0;
	}
	var d = -n.x*v1.x - n.y*v1.y - n.z*v1.z,
		z = (-n.x*vv.x - n.y*vv.y - d) / n.z,
		dz = z - vv.z;
	if (dz < -Raphael3d.TOL) { return 1; }
	if (dz > Raphael3d.TOL) { return -1; }
	return 0;
}

/** Computes if projection of receiver is in front of given face
* @param {Raphael3d.Face} face given object
* @returns {number}
							0: for no overlap of projections
							1: if receiver in front of face, 
							-1: if face in front of receiver
* @private
*/
Raphael3d.Face.prototype.isInFrontOfFace = function(face) {
	var ret = 0, edges = this.edges, ne = edges.length, e, pos;
	for (var i=0; i<ne; i++) {
		e = edges[i];
		pos = e.isInFrontOfFace(face);
		ret += pos;
		//if (ret > 1 || ret < -1) { break; }
	}
	if (ret > 0) { return 1; }
	if (ret < 0) { return -1; }
	edges = face.edges;
	ne = edges.length;
	for (var i=0; i<ne; i++) {
		e = edges[i];
		pos = e.isInFrontOfFace(this);
		ret -= pos;
		//if (ret > 1 || ret < -1) { break; }
	}
	if (ret > 0) { return 1; }
	if (ret < 0) { return -1; }
	return 0;
}

/** Computes if projection of receiver is in front of given surface
* @param {Raphael3d.Surface} surface given object
* @returns {number}
							0: for no overlap of projections
							1: if receiver in front of surface, 
							-1: if surface in front of receiver
* @private
*/
Raphael3d.Face.prototype.isInFrontOfSurface = function(surface) {
	var faces = surface.faces, nf = faces.length, pos, ret=0;
	for (var i=0; i<nf; i++) {
		pos = this.isInFrontOfFace(faces[i]);
		ret += pos
	}
	if (ret > 0) { return 1; }
	if (ret < 0) { return -1; }
	return 0;
}








/** Surface implementation, currently only convex shapes are supported (non-convex surfaces can be composed from several convex ones)
* @class represents surface composed of faces
* @param {Array.<Raphael3d.Vertex>} vertices array of vertices of the surface
* @param {Array.<Raphael3d.Face>} faces array of faces of the surface
* @param {Raphael.Paper=} paper raphael paper instance
* @property {Array.<Raphael3d.Vertex>} vertices array of vertices of the surface
* @property {Array.<Raphael3d.Face>} faces array of faces
* @property {Array.<Raphael3d.Vector3>} projectedNormals array of projected normals of faces
* @property {Paper.el} wireframe wireframe (one paper.path for all non-backface edges)
* @property {Paper.el} wireframeBackface (one paper.parh for all backface edges)
* @property {Raphael3d.Material} material material of receiver
* @property {boolean} isConvex indicated if surface is convex or not
* @property {boolean} isDoubleSided indicated if surface is double sided or not
* @property {number} transparency transparency of receiver (from 0 to 1)
* @property {boolean} isDoubleSided if receiver is double sided. If yes, it is rendered always, if not, only whan projectedNormal has positive z cordinate
* @property {Raphael3d.AABB} aabb receiver's axis aligned bounding box
* @property {Raphael3d.AABB} aabbProjected aabb of receiver's projection
* @property {Array} coveredByList list of objects receiver is covered by (defined by the user)
* @property {Raphael.el} path paper.path instance (only for visibility order reasons)
* @this Raphael3d.Face
* @constructor
*/
Raphael3d.Surface = function(vertices,faces,paper) {
	this.vertices = vertices===undefined? [] : vertices.slice();
	this.faces = faces===undefined? [] : faces.slice();
	this.faceNormals = [];
	this.projectedFaceNormals = [];
	this.wireframe = paper? paper.path().attr({"stroke-linejoin":"bevel"}) : null;
	this.wireframeBackface = paper? paper.path().attr({"stroke-linejoin":"bevel"}) : null;
	this.material = null;
	this.aabb = new Raphael3d.AABB();
	this.aabbProjected = new Raphael3d.AABB();
	this.isConvex = true;
	this.isDoubleSided = true;
	this.path = paper? paper.path().hide() : null;
	this.coveredByList = [];
}
Raphael3d.Surface.prototype.__type = 'Surface';

/** Returns false, for compatibility reasons
*/
Raphael3d.Surface.prototype.isProjectedZParallel = function() {
	return false;
}

/** Creates new Surface object. See {@link Raphael3d.Surface} for arguments
* @param {Array.<Raphael3d.Vertex>} vertices
* @param {Array.<Raphael3d.Face>} faces
* @param {Raphael.Paper} paper
* @returns {Raphael3d.Surface} new Surface object
*/
Raphael3d.Surface.create = function(vertices,faces,paper) {
	return new Raphael3d.Surface(vertices,faces,paper);
}

/** Set isDoubleSided of receiver (and all faces) to given value
* @param {boolean} d
* @returns {Raphael3d.Surface} receiver
*/
Raphael3d.Surface.prototype.setDoubleSidedTo = function(d) {
	this.isDoubleSided = d;
	var faces = this.faces, nf = faces.length;
	for (var i=0; i<nf; i++) {
		faces[i].isDoubleSided = d;
	}
	return this;
}

/** Hides wireframe
* @returns {Raphael3d.Surface} receiver
*/
Raphael3d.Surface.prototype.hideWireframe = function() {
	if (this.wireframe) {
		this.wireframe.hide();
	}
	if (this.wireframeBackface) {
		this.wireframeBackface.hide();
	}
	return this;
}

/** Shows wireframe
* @returns {Raphael3d.Surface} receiver
*/
Raphael3d.Surface.prototype.showWireframe = function() {
	if (this.wireframe) {
		this.wireframe.show();
	}
	if (this.wireframeBackface) {
		this.wireframeBackface.show();
	}
	return this;
}

/** Projects receiver (i.e. changes projected coordinates of vertices) according to given matrix
* @param {Raphael3d.Matrix4x4} m projection matrix
* @returns {Raphael3d.Surface} receiver
*/
Raphael3d.Surface.prototype.project = function(m) {
	if (!m) { return this; }
	var nv = this.vertices.length;
	for (var i=0; i<nv; i++) {
		this.vertices[i].project(m);
	}
	return this;
}

/** Updates receiver (its faces) with given material
* @param {Raphael3d.Material=} material material of update. If ommited, this.material will be used instead
* @returns {Raphael3d.Surface} receiver
*/
Raphael3d.Surface.prototype.update = function(material) {
	this.updateFaces(material);
	return this;
}

/** Updates faces of receiver (compute normals, update and order) with given material
* @param {Raphael3d.Material=} material material of update. If ommited, this.material will be used instead
*/
Raphael3d.Surface.prototype.updateFaces = function(material) {
	material = this.material || material;
	this.updateFaceNormals();
	var nf = this.faces.length;
	for (var i=0; i<nf; i++) {
		this.faces[i].update(material);
	}
	this.orderFaces();
}

/** Renders receiver (i.e. wireframes and faces)
* @returns {Raphael3d.Surface} receiver
*/
Raphael3d.Surface.prototype.render = function(skipBackFace) {
	this.renderWireframeBackface();
	this.renderFaces();
	this.renderWireframe(skipBackFace);
	return this;
}

/** Renders faces of receiver
*/
Raphael3d.Surface.prototype.renderFaces = function() {
	if (!this.path) { return; }
	var faces = this.faces,
		nf = faces.length,
		f;
	for (var i=nf-1; i>=0; i--) {
		f = faces[i];
		if (!f.path) { continue; }
		f.path.insertBefore(this.path);
		f.render();
	}
}

/** Updates normals of faces
*/
Raphael3d.Surface.prototype.updateFaceNormals = function() {
	if (this.faceNormals.length == this.projectedFaceNormals.length == this.faces.length) { return; }
	var faces = this.faces,
		nf = faces.length,
		faceNormals = new Array(nf),
		projectedFaceNormals = new Array(nf);
	for (var i=0; i<nf; i++) {
		faceNormals[i] = faces[i].normal;
		projectedFaceNormals[i] = faces[i].projectedNormal;
	}
	this.faceNormals = faceNormals;
	this.projectedFaceNormals = projectedFaceNormals;
}

/** Renders wireframes
* @params {boolean=} skipBackFace if true, do not render backface faces
*/
Raphael3d.Surface.prototype.renderWireframe = function(skipBackFace) {
	if (!this.wireframe || !this.path) { return; }
	this.wireframe.insertBefore(this.path);
	var faces = this.faces,
		nf = this.faces.length,
		nv = 0;
	for (var i=0; i<nf; i++) {
		if (skipBackFace && !faces[i].isBackFace) {
			nv += faces[i].vertices.length;
		}
	}
	var p = new Array(3*nv+nf);
	var v, f, ii=0;
	for (var i=0; i<nf; i++) {
		f = this.faces[i];
		if (skipBackFace && f.isBackFace) {
			continue;
		}
		v = f.vertices;
		nv = v.length;
		p[ii] = "M";
		p[ii+1] = v[0].projected.x;
		p[ii+2] = v[0].projected.y;
		ii += 3;
		for (var j=1; j<nv; j++) {
			p[ii] = "L";
			p[ii+1] = v[j].projected.x;
			p[ii+2] = v[j].projected.y;
			ii += 3;
		}
		p[ii] = ["Z"];
		ii += 1;
	}
	this.wireframe.attr({path:p});
}

/** Render backface wireframe
*/
Raphael3d.Surface.prototype.renderWireframeBackface = function() {
	if (!this.wireframeBackface || !this.path) { return; }
	this.wireframe.insertBefore(this.path);
	var faces = this.faces,
		nf = this.faces.length,
		e, f,
		nv = 0,
		edges, ne;
	for (var i=0; i<nf; i++) {
		if (faces[i].isBackFace) {
			f = faces[i];
			edges = f.edges;
			ne = edges.length;
			for (var j=0; j<ne; j++) {
				e = edges[j];
				if (e.isBackFace) {
					nv += 1;
				}
			}
		}
	}
	var p;
	if (nv == 0) {
		p = ["M",0,0,"h",0]
	} else {
		p = new Array(2*nv);
		var v1,v2, ii=0;
		for (var i=0; i<nf; i++) {
			f = this.faces[i];
			if (!f.isBackFace) {
				continue;
			}
			edges = f.edges;
			ne = edges.length;
			for (var j=0; j<ne; j++) {
				e = edges[j];
				if (!e.isBackFace) {
					continue;
				}
				v1 = e.v1;
				v2 = e.v2;
				p[ii] = "M";
				p[ii+1] = v1.projected.x;
				p[ii+2] = v1.projected.y;
				p[ii+3] = "L";
				p[ii+4] = v2.projected.x;
				p[ii+5] = v2.projected.y;
				ii += 6;
			}
		}
	}
	this.wireframeBackface.attr({path:p});
}

/** Transforms receiver (i.e. change real coordinates of vertices) according to given matrix
* @param {Raphael3d.Matrix4x4} m transformation matrix
* @returns receiver
*/
Raphael3d.Surface.prototype.transform = function(m) {
	var nv = this.vertices.length;
	for (var i=0; i<nv; i++) {
		this.vertices[i].transform(m);
	}
	return this;
}

/** Translate receiver (changes real coordinates of vertices)
* @param {number} tx translation in x direction
* @param {number} ty translation in y direction
* @param {number} tz translation in z direction
* @returns {Raphael3d.Surface} receiver
*/
Raphael3d.Surface.prototype.translate = function(tx,ty,tz) {
	this.transform(Raphael3d.Matrix4x4.TranslationMatrix(tx,ty,tz));
	return this;
}

/** Scale receiver (changes real coordinates of vertices)
* @param {number} sx scale factor in x direction
* @param {number} sy scale factor in y direction
* @param {number} sz scale factor in z direction
* @returns {Raphael3d.Surface} receiver
*/
Raphael3d.Surface.prototype.scale = function(sx,sy,sz) {
	this.transform(Raphael3d.Matrix4x4.ScaleMatrix(sx,sy,sz));
	return this;
}

/** Shear receiver (changes real coordinates of vertices)
* @param {number} shxy shear factor in xy plane
* @param {number} shyz shear factor in yz plane
* @param {number} shzx shear factor in zx plane
* @returns {Raphael3d.Surface} receiver
*/
Raphael3d.Surface.prototype.shear = function(shxy,shyz,shzx) {
	this.transform(Raphael3d.Matrix4x4.ShearMatrix(shxy,shyz,shzx));
	return this;
}

/** Order projected faces of receiver. Current implementation only for convex surfaces (nun-convex shapes can be composed of several convex ones)
*/
Raphael3d.Surface.prototype.orderFaces = function() {
	if (this.isConvex) { // jusr put back-feced faces to the back, as surface is convex, this is sufficient
		var faces = this.faces,
			nf = faces.length,
			j = 0,
			k = nf-1,
			iter = 0,
			iter2,
			temp;
		while (true) {
			iter2 = 0;
			while (!faces[j].isBackFace && j <= nf-2) {
				j += 1;
			}
			iter2 = 0;
			while (faces[k].isBackFace && k >= 1) {
				k -= 1;
			}
			if (j >= k) { break; }
			temp = faces[j];
			faces[j] = faces[k];
			faces[k] = temp;
		}
	} else { // TODO
	}
}

/** Sets new wireframe to the receiver
* @param {Raphael.el} wireframe new wireframe
* @returns {Raphael3d.Surface} receiver
*/
Raphael3d.Surface.prototype.setWireframe = function(wireframe) {
	this.wireframe = wireframe;
	return this;
}

/** Sets new material to the receiver
* @param {Raphael3d.Material} material new material
* @returns {Raphael3d.Surface} receiver
*/
Raphael3d.Surface.prototype.setMaterial = function(material) {
	this.material = material;
	return this;
}

/** Updates AABB (axis aligned bounding box) of the receiver
* @returns {Raphael3d.Surface} receiver
*/
Raphael3d.Surface.prototype.updateAABB = function() {
	var nv = this.vertices.length,
		v, vp,
		x,y,z,
		xp, yp, zp,
		minX, minY, minZ,
		maxX, maxY, maxZ,
		minXP, minYP, minZP,
		maxXP, maxYP, maxZP;
	minX = minY = minZ = Number.POSITIVE_INFINITY;
	maxX = maxY = maxZ = Number.NEGATIVE_INFINITY;
	minXP = minYP = minZP = Number.POSITIVE_INFINITY;
	maxXP = maxYP = maxZP = Number.NEGATIVE_INFINITY;
	for (var i=0; i<nv; i++) {
		v = this.vertices[i];
		vp = v.projected;
		x = v.x;
		y = v.y;
		z = v.z;
		xp = vp.x;
		yp = vp.y;
		zp = vp.z;
		//
		minX = Math.min(x,minX);
		minY = Math.min(y,minY);
		minZ = Math.min(z,minZ);
		maxX = Math.max(x,maxX);
		maxY = Math.max(y,maxY);
		maxZ = Math.max(z,maxZ);
		//
		minXP = Math.min(xp,minXP);
		minYP = Math.min(yp,minYP);
		minZP = Math.min(zp,minZP);
		maxXP = Math.max(xp,maxXP);
		maxYP = Math.max(yp,maxYP);
		maxZP = Math.max(zp,maxZP);
	}
	this.aabb.setVals(minX,minY,minZ, maxX,maxY,maxZ);
	this.aabbProjected.setVals(minXP,minYP,minZP, maxXP,maxYP,maxZP);
	return this;
}

/** Computes if projection of receiver is in front of given object
* @param {Raphael3d.Edge|Raphael3d.Face|Raphael3d.Surface} b given object
* @returns {boolean} true if projection of receiver is in front of given object, false otherwise
* @private
*/
Raphael3d.Surface.prototype.isInFrontOf = function(b) {
	var pos;
	if (b.__type == 'Edge') {
		return b.isInFrontOfSurface(this) == -1? true : false;
	}
	if (b.__type == 'Face') {
		return b.isInFrontOfSurface(this) == -1? true : false;
	}
	if (b.__type == 'Surface') {
		pos = this.isInFrontOfSurface(b);
	}
	return pos==1? true : false;
}

/** Computes if projection of receiver is in front of given surface
* @param {Raphael3d.Surface} surface given object
* @returns {number}
							0: for no overlap of projections
							1: if receiver in front of surface, 
							-1: if surface in front of receiver
* @private
*/
Raphael3d.Surface.prototype.isInFrontOfSurface = function(surface) {
	var faces = this.faces, nf = faces.length, pos, ret=0;
	for (var i=0; i<nf; i++) {
		pos = faces[i].isInFrontOf(surface)
		ret += pos;
	}
	if (ret > 0) { return 1; }
	if (ret < 0) { return -1; }
	return 0;
}

/** Checks if receiver is covered by given object (i.e. if the given object is present in initially empty coveredByList attribute, filled by the user)
* @param {Raphael3d.Edge|Raphael3d.Face|Raphael3d.Surface} b given object
* @returns {boolean} true if receiver is covered by given object, false otherwise
*/
Raphael3d.Surface.prototype.isCoveredBy = function(b) {
	return Raphael3d.__isCoveredBy(this,b);
}



/** Creates new Surface of axis aligned tetrahedron shape
* @param {number} x x coordinate
* @param {number} y y coordinate
* @param {number} z z coordinate
* @param {number} dx x size
* @param {number} dy y size
* @param {number} dz z size
* @param {Raphael.Paper} paper paper
* @param {Object=} faceAttrs face attribues passed to face.attr()
* @returns {Raphael3d.Surface} new Surface object of tetrahedron shape
*/
Raphael3d.Surface.Tetrahedron = function(x,y,z,dx,dy,dz,paper,faceAttrs) {
	var v1 = new Raphael3d.Vertex(x,y,z),
		v2 = new Raphael3d.Vertex(x+dx,y,z),
		v3 = new Raphael3d.Vertex(x,y+dy,z),
		v4 = new Raphael3d.Vertex(x,y,z+dz);
	return Raphael3d.Surface.Tetrahedron.FromVertices(v1,v2,v3,v4,paper,faceAttrs);
}

/** Creates new Surface of tetrahedron shape, from given vertices
* @param {Raphael3d.Vertex} v1 1st vertex
* @param {Raphael3d.Vertex} v2 2nd vertex
* @param {Raphael3d.Vertex} v3 3rd vertex
* @param {Raphael3d.Vertex} v4 4th vertex
* @param {Raphael.Paper} paper paper
* @param {Object=} faceAttrs face attribues passed to face.attr()
* @returns {Raphael3d.Surface} new Surface object of tetrahedron shape
*/
Raphael3d.Surface.Tetrahedron.FromVertices = function(v1,v2,v3,v4,paper,faceAttrs) {
	var ret = new Raphael3d.Surface([v1,v2,v3,v4],undefined,paper);
	ret.faces = [
		new Raphael3d.Face([v1,v3,v2],paper,faceAttrs),
		new Raphael3d.Face([v1,v2,v4],paper,faceAttrs),
		new Raphael3d.Face([v2,v3,v4],paper,faceAttrs),
		new Raphael3d.Face([v1,v4,v3],paper,faceAttrs)
	];
	return ret;
}


/** Creates new Surface of axis aligned box shape
* @param {number} x0 x coordinate
* @param {number} y0 y coordinate
* @param {number} z0 z coordinate
* @param {number} dx x size
* @param {number} dy y size
* @param {number} dz z size
* @param {Raphael.Paper} paper paper
* @param {Object=} faceAttrs face attribues passed to face.attr()
* @returns {Raphael3d.Surface} new Surface object of box shape
*/
Raphael3d.Surface.Box = function(x0,y0,z0,dx,dy,dz,paper,faceAttrs) {
	var x1 = x0 + dx, y1 = y0 + dy, z1 = z0 + dz;
	var v1 = new Raphael3d.Vertex(x0,y0,z1),
		v2 = new Raphael3d.Vertex(x0,y1,z1),
		v3 = new Raphael3d.Vertex(x1,y1,z1),
		v4 = new Raphael3d.Vertex(x1,y0,z1),
		v5 = new Raphael3d.Vertex(x0,y0,z0),
		v6 = new Raphael3d.Vertex(x0,y1,z0),
		v7 = new Raphael3d.Vertex(x1,y1,z0),
		v8 = new Raphael3d.Vertex(x1,y0,z0);
	return Raphael3d.Surface.Box.FromVertices(v1,v2,v3,v4,v5,v6,v7,v8,paper,faceAttrs);
}

/** Creates new Surface of box shape, from given vertices
* @param {Raphael3d.Vertex} v1 1st vertex (0,0,1)
* @param {Raphael3d.Vertex} v2 2nd vertex (0,1,1)
* @param {Raphael3d.Vertex} v3 3rd vertex (1,1,1)
* @param {Raphael3d.Vertex} v4 4th vertex (1,0,1)
* @param {Raphael3d.Vertex} v5 5th vertex (0,0,0)
* @param {Raphael3d.Vertex} v6 6th vertex (0,1,0)
* @param {Raphael3d.Vertex} v7 7th vertex (1,1,0)
* @param {Raphael3d.Vertex} v8 8th vertex (1,0,0)
* @param {Raphael.Paper} paper paper
* @param {Object=} faceAttrs face attribues passed to face.attr()
* @returns {Raphael3d.Surface} new Surface object of box shape
*/
Raphael3d.Surface.Box.FromVertices = function(v1,v2,v3,v4,v5,v6,v7,v8,paper,faceAttrs) {
	var ret = new Raphael3d.Surface([v1,v2,v3,v4,v5,v6,v7,v8],undefined,paper);
	ret.faces = [
		new Raphael3d.Face([v1,v4,v3,v2],paper,faceAttrs),
		new Raphael3d.Face([v5,v6,v7,v8],paper,faceAttrs),
		new Raphael3d.Face([v1,v2,v6,v5],paper,faceAttrs),
		new Raphael3d.Face([v2,v3,v7,v6],paper,faceAttrs),
		new Raphael3d.Face([v3,v4,v8,v7],paper,faceAttrs),
		new Raphael3d.Face([v4,v1,v5,v8],paper,faceAttrs)
	];
	return ret;
}


/** Creates new Surface of z aligned regular multigonal prism shape
* @param {number} x x coordinate of the canter of the base
* @param {number} y y coordinate of the canter of the base
* @param {number} z z coordinate of the canter of the base
* @param {number} r radius of the base
* @param {number} h height
* @param {number} n number of vertices in the base
* @param {Raphael.Paper} paper paper
* @param {Object=} faceAttrs face attribues passed to face.attr()
* @returns {Raphael3d.Surface} new Surface object of prism shape
*/
Raphael3d.Surface.Prism = function(x,y,z,r,h,n,paper,faceAttrs) {
	if (n < 3) { return null; }
	var vertices = new Array(2*n);
	var a,c,s;
	for (var i=0; i<n; i++) {
		a = i*2*Math.PI/n;
		c = Math.cos(-a);
		s = Math.sin(-a);
		vertices[i]   = new Raphael3d.Vertex(x+r*c, y+r*s, z+h);
		vertices[i+n] = new Raphael3d.Vertex(x+r*c, y+r*s, z);
	}
	return Raphael3d.Surface.Prism.FromVertices(vertices,paper,faceAttrs);
}

/** Creates new Surface of prism shape, from vertices
* @param {Array.<Raphael3d.Vertex>} vertices array of vertices of the base
* @param {Raphael.Paper} paper paper
* @param {Object=} faceAttrs face attribues passed to face.attr()
* @returns {Raphael3d.Surface} new Surface object of prism shape
*/
Raphael3d.Surface.Prism.FromVertices = function(vertices,paper,faceAttrs) {
	var ret = new Raphael3d.Surface(vertices,undefined,paper),
		nv = .5*vertices.length,
		faces = new Array(nv + 2),
		i, j, k;
	//
	var v;
	for (i=0; i<nv; i++) {
		j = (i == nv - 1)? 0 : i+1;
		k = (i == nv - 1)? nv : i+nv+1;
		v = [ vertices[i], vertices[j], vertices[k], vertices[i+nv] ];
		faces[i] = new Raphael3d.Face(v,paper,faceAttrs);
	}
	v = vertices.slice(0,nv);
	v.reverse();
	faces[nv] = new Raphael3d.Face(v,paper,faceAttrs);
	v = vertices.slice(nv,2*nv);
	faces[nv+1] = new Raphael3d.Face(v,paper,faceAttrs);
	//
	ret.faces = faces;
	return ret;
}

/** Creates new Surface of z aligned regular miltigonal pyramid shape
* @param {number} x x coordinate of the canter of the base
* @param {number} y y coordinate of the canter of the base
* @param {number} z z coordinate of the canter of the base
* @param {number} r radius of the base
* @param {number} h height
* @param {number} n number of vertices in the base
* @param {Raphael.Paper} paper paper
* @param {Object=} faceAttrs face attribues passed to face.attr()
* @returns {Raphael3d.Surface} new Surface object of pyramid shape
*/

Raphael3d.Surface.Pyramid = function(x,y,z,r,h,n,paper,faceAttrs) {
	if (n < 3) { return null; }
	var vertices = new Array(n+1);
	var a,c,s;
	for (var i=0; i<n; i++) {
		a = i*2*Math.PI/n;
		c = Math.cos(a);
		s = Math.sin(a);
		vertices[i]   = new Raphael3d.Vertex(x+r*c, y+r*s, z);
	}
	vertices[n] = new Raphael3d.Vertex(x,y,z+h)
	return Raphael3d.Surface.Pyramid.FromVertices(vertices,paper,faceAttrs);
}

/** Creates new Surface of pyramid shape, from vertices
* @param {Array.<Raphael3d.Vertex>} vertices array of vertices of the base
* @param {Raphael.Paper} paper paper
* @param {Object=} faceAttrs face attribues passed to face.attr()
* @returns {Raphael3d.Surface} new Surface object of prism shape
*/
Raphael3d.Surface.Pyramid.FromVertices = function(vertices,paper,faceAttrs) {
	var ret = new Raphael3d.Surface(vertices,undefined,paper),
		nv = vertices.length-1,
		faces = new Array(nv + 1),
		i, j, k,
		top = vertices[nv];
	//
	var v;
	for (i=0; i<nv; i++) {
		j = (i == nv - 1)? 0 : i+1;
		k = (i == nv - 1)? nv : i+nv+1;
		v = [ vertices[i], vertices[j], top ];
		faces[i] = new Raphael3d.Face(v,paper,faceAttrs);
	}
	v = vertices.slice(0,nv);
	v.reverse();
	faces[nv] = new Raphael3d.Face(v,paper,faceAttrs);
	//
	ret.faces = faces;
	return ret;
}
	



/** Camera object
* @class represents camera
* @param {Raphael3d.Vector3=} focalPoint point that camera focuse on
* @param {number=} dist distance from focal point
* @param {Raphael3d.Matrix4x4=} rotation rotation matrix (how camera is rotated with rescpect to global axes
* @param {number=} zoomFactor zoom factor
* @property {Raphael3d.Vector3} focalPoint point that camera focuse on
* @property {number} dist distance from focal point
* @property {Raphael3d.Matrix4x4} rotation rotation matrix
* @property {number} zoomFactor zoom factor
* @property {Raphael3d.Matrix4x4} matrix final projection matrix
* @this Raphael3d.Camera
* @constructor
*/
Raphael3d.Camera = function(focalPoint,dist,rotation,zoomFactor) {
	this.focalPoint = focalPoint || new Raphael3d.Vector3();
	this.dist = dist || 0.;
	this.rotation = rotation || Raphael3d.Matrix4x4.Identity();
	this.zoomFactor = zoomFactor || 1.;
	this.matrix = Raphael3d.Matrix4x4.Identity();
}

/** creates new Camera object. See {@link Raphael3d.Camera} for arguments
* @param {Raphael3d.Vector3=} focalPoint
* @param {number=} dist
* @param {Raphael3d.Matrix4x4=} rotation
* @param {number=} zoomFactor
* @returns {Raphael3d.Camera} new camera object
*/
Raphael3d.Camera.create = function(focalPoint,dist,rotation,zoomFactor) {
	return new Raphael3d.Camera(focalPoint,dist,rotation,zoomFactor);
}

/** Rotates receiver around x axis
* @param {number} angle angle of rotation
* @returns {Raphael3d.Camera} receiver
*/
Raphael3d.Camera.prototype.rotateX = function(angle) {
	this.rotation.rotateX(angle);
	return this;
}

/** Rotates receiver around y axis
* @param {number} angle angle of rotation
* @returns {Raphael3d.Camera} receiver
*/
Raphael3d.Camera.prototype.rotateY = function(angle) {
	this.rotation.rotateY(angle);
	return this;
}

/** Rotates receiver around z axis
* @param {number} angle angle of rotation
* @returns {Raphael3d.Camera} receiver
*/
Raphael3d.Camera.prototype.rotateZ = function(angle) {
	this.rotation.rotateZ(angle);
	return this;
}

/** Zoom receiver (relatively to current state)
* @param {number} z zoom factor
* @returns {Raphael3d.Camera} receiver
*/
Raphael3d.Camera.prototype.zoom = function(z) {
	this.zoomFactor *= z;
	return this;
}

/** Set zoom of receiver (absolute value)
* @param {number} z new zoom factor
* @returns {Raphael3d.Camera} receiver
*/
Raphael3d.Camera.prototype.setZoomFactor = function(z) {
	this.zoomFactor = z;
	return this;
}

/** Resets rotation of receiver
* @returns {Raphael3d.Camera} receiver
*/
Raphael3d.Camera.prototype.resetRotations = function() {
	this.rotation.beIdentity();
	return this;
}

/** Set focal point of receiver
* @param {Raphael3d.Vector3} focalPoint vew focal point
* @returns {Raphael3d.Camera} receiver
*/
Raphael3d.Camera.prototype.setFocalPoint = function(focalPoint) {
	this.focalPoint = focalPoint;
	return this;
}

/** Set distance of receiver
* @param {number} d new distance
* @returns {Raphael3d.Camera} receiver
*/
Raphael3d.Camera.prototype.setDist = function(d) {
	this.dist = d;
	return this;
}

/** Updates receiver (sets receiver to this.focalPoint, rotate it according to this.rotation, translate to distance this.dist/this.zoomFactor and zoom to this.zoomFactor)
* @returns {Raphael3d.Camera} receiver
*/
Raphael3d.Camera.prototype.update = function() {
	this.matrix.beIdentity();
	var fp = this.focalPoint;
	this.matrix.translate(-fp.x, -fp.y, -fp.z);
	this.matrix.mul(this.rotation);
	this.matrix.translate(0,0,this.dist/this.zoomFactor);
	this.matrix.zoom(this.zoomFactor);
	return this;
}





/** Scene implementation
* @class represent scene implementation
* @param {Raphael.Paper=} paper
* @param {{
				vertices:Array.<Raphael3d.Vertex>,
				edges:Array.<Raphael3d.Edge>,
				faces:Array.<Raphael3d.Face>,
				surfaces:Array.<Raphael3d.Surface>,
				projection:Raphael3d.Matrix4x4,
				camera:Raphael3d.Camera,
				lcs:Raphael3d.Matrix4x4,
				material:Raphael3d.Material,
				visMethod:number}=} params
* @param {Array.<Raphael3d.Vertex>=} params.vertices array of standalone vertices
* @param {Array.<Raphael3d.Edge>=} params.edges array of standalone edges
* @param {Array.<Raphael3d.Face>=} params.faces array of standalone faces
* @param {Array.<Raphael3d.Surface>=} params.surfaces array of surfaces
* @param {Raphael3d.Matrix4x4=} params.projection projection matrix (how is the camera view projected, usually {@link Raphael3d.Matrix4x4#PerspectiveMatrixZ})
* @param {Raphael3d.Camera=} params.camera
* @param {Raphael3d.Matrix4x4=} params.lcs local coordinate system (in Paper dimensions, how the view is transformed on the screen, usually translates the view to fit {@link Raphael.fn.Viewer})
* @param {Raphael3d.Material=} params.material
* @property {Array.<Raphael3d.Vertex>} vertices array of standalone vertices
* @property {Array.<Raphael3d.Edge>} array of standalone edges
* @property {Array.<Raphael3d.Face>} array of standalone faces
* @property {Array.<Raphael3d.Surface>} array of standalone surfaces
* @property {Raphael3d.Matrix4x4} projection projection matrix (how is the camera view projected, usually {@link Raphael3d.Matrix4x4#PerspectiveMatrixZ})
* @property {Raphael3d.Camera} camera
* @property {Raphael3d.Matrix4x4} lcs local coordinate system (in Paper dimensions, how the view is transformed on the screen, usually translates the view to fit {@link Raphael.fn.Viewer})
* @property {Raphael3d.Material} material
* @property {Raphael3d.AABB} aabb axis aligned bounding box of the scene
* @property {Raphael.el} path path of the scene, for ordering and visibility reasons
* @property {Array} renderList
* @property {number} visMethod visibility computing method. 0 (defeult) = painters algorithm, only centers of AABBs are used to solve visibility (fastest, but usually not sufficient). 1 = using inFrontOf methods. From tests seems robust enough
* @property {Raphael3d.Matrix4x4} matrix final projection matrix, changed with update() method
* @this Raphael3d.Scene
* @constructor
*/
Raphael3d.Scene = function(paper,params) {
	params = params || {};
	this.vertices = params.vertices===undefined? [] : params.vertices.slice();
	this.edges = params.edges===undefined? [] : params.edges.slice();
	this.faces = params.faces===undefined? [] : params.faces.slice();
	this.surfaces = params.surfaces===undefined? [] : params.surfaces.slice();
	this.projection = params.projection || Raphael3d.Matrix4x4.Identity();
	this.camera = params.camera || new Raphael3d.Camera();
	this.lcs = params.lcs || Raphael3d.Matrix4x4.Identity();
	this.material = params.material || null;
	this.aabb = new Raphael3d.AABB();
	this.path = paper? paper.path().hide() : null;
	this.renderList = [];
	this.visMethod = params.visMethod || 0;
	this.matrix = Raphael3d.Matrix4x4.Identity()
}

/** Creates new Scene object. See {@link Raphael3d.Scene} for arguments
* @param {Raphael.Paper} paper
* @param {Object=} params
* @returns {Raphael3d.Scene} new Scene object
*/
Raphael3d.Scene.create = function(paper,params) {
	return new Raphael3d.Scene(paper,params);
}

/** Updates receiver (updates camera, project and updates all geometric entities, computes visibility). The final projection matrix is composed of (in order) this.camera.matrix, this.projction, this.lcs .
* @returns {Raphael3d.Scene} receiver
*/
Raphael3d.Scene.prototype.update = function() {
	this.camera.update();
	this.matrix = this.camera.matrix.copy().mul(this.projection).mul(this.lcs);
	var vertices = this.vertices,
		nv = this.vertices.length,
		edges = this.edges,
		ne = edges.length,
		faces = this.faces,
		nf = faces.length,
		surfaces = this.surfaces,
		ns = surfaces.length;
	for (var i=0; i<nv; i++) {
		vertices[i].project(this.matrix);
	}
	for (var i=0; i<ne; i++) {
		edges[i].project(this.matrix);
		edges[i].update();
	}
	for (var i=0; i<nf; i++) {
		faces[i].project(this.matrix);
		faces[i].update();
	}
	for (var i=0; i<ns; i++) {
		surfaces[i].project(this.matrix);
		surfaces[i].update(this.material);
	}
	this.solveVisibility(this.visMethod);
	return this;
}

/** Renders receiver (order geometric entities raphael paths according to precomputed visibility and and render them)
* @param {boolean} skipBackFace parameter passed to render of geometric eontities
* @return {Raphael3d.Scene} receiver
*/
Raphael3d.Scene.prototype.render = function(skipBackFace) {
	if (!this.path) { return this; }
	var item,
		rList = this.renderList,
		ni = rList.length;
	for (var i=0; i<ni; i++) {
		item = rList[i];
		if (!item.path) { continue; }
		item.path.insertBefore(this.path);
		item.render(skipBackFace);
	}
	return this;
}

/** Iintialze renderList (used mainly when new entities are added)
* @private
*/
Raphael3d.Scene.prototype.initRenderList = function() {
	var edges = this.edges,
		ne = edges.length,
		faces = this.faces,
		nf = faces.length,
		surfaces = this.surfaces,
		ns = surfaces.length,
		rList = this.renderList,
		i;
	rList.length = 0;
	rList.length = ne + nf + ns;
	for (i=0; i<ne; i++) {
		rList[i] = edges[i];
	}
	for (i=0; i<nf; i++) {
		rList[ne+i] = faces[i];
	}
	for (i=0; i<ns; i++) {
		rList[ne+nf+i] = surfaces[i];
	}
}

/** Computes visibility and order entities into renderList
* @param {number=} method of solution, see {@link Raphael3d.Scene}
* @param {number=} maxiter maximum number of iterations
*/
Raphael3d.Scene.prototype.solveVisibility = function(method,maxiter) {
	//this.initRenderList();
	var rList = this.renderList, nr = rList.length;
	switch (method) {
		case 1:
			//this.initRenderList()
			for (var i=0; i<nr; i++) {
				rList[i].updateAABB();
			}
			var ia, ib, temp, i=0, anyChange;
			var iter = 0, iMax;
			while (i < nr-1) { // all to all comparison
				ia = rList[i]
				iMax = i;
				anyChange = false;
				for (var j=i+1; j<nr; j++) {
					ib = rList[j];
					if (ib.isProjectedZParallel()) { continue; }
					if (ia.isCoveredBy(ib)) { continue; }
					if (ia.isInFrontOf(ib) || ib.isCoveredBy(ia)) { // choosing the most back element
						//ib.coveredByList.push(ia);
						rList[i] = ib;
						rList[j] = ia;
						anyChange = true;
						break
					}
				}
				iter++;
				if (iter >= nr*nr-i) {
					i += 1
					iter = 0;
					continue;
				}
				if (anyChange) {
					continue;
				}
				i += 1;
				iter = 0;
			}
			break;
		default: // painter's algorithm, sort objects by their aabb.center. Fastest, but not always gives desired results
			for (var i=0; i<nr; i++) {
				rList[i].updateAABB();
			}
			var ia, ib, anyChange;
			for (var i=0; i<nr-1; i++) { // bubble sort
				anyChange = false;
				for (var j=i; j<nr-1; j++) {
					ia = rList[j];
					ib = rList[j+1];
					if (ia.aabbProjected.center.z < ib.aabbProjected.center.z) {
						rList[j+1] = ia;
						rList[j]   = ib;
						anyChange = true;
					}
				}
				if (!anyChange) { break; }
			}
	}
}

/** Sets new center as camera focal point
* @param {Raphael3d.Vector3=} center new center (if ommited, center of AABB is used instead)
* @returns {Raphael3d.Scene} receiver
*/
Raphael3d.Scene.prototype.setCenter = function(center) {
	if (!center) {
		this.updateAABB();
		this.camera.focalPoint.beCopyOf(this.aabb.center);
	}
	return this;
}

/** Adds one vertex to receiver
* @param {Raphael3d.Vertex} vertex new vertex
* @returns {Raphael3d.Scene} receiver
*/
Raphael3d.Scene.prototype.addVertex = function(vertex) {
	this.vertices.push(vertex);
	return this;
}

/** Adds one or several vertices to receiver
* @param {Raphael3d.Vertex|Array.<Raphael3d.Vertex>} var_args (array or argument list of) new vertice(s)
* @returns {Raphael3d.Scene} receiver
*/
Raphael3d.Scene.prototype.addVertices = function(var_args) {
	var na = arguments.length;
	if (na == 1 && arguments[0] instanceof Array) {
		var vertices = arguments[0];
		var ns = vertices.length;
		for (var i=0; i<ns; i++) {
			this.addVertex(vertices[i]);
		}
		return this;
	}
	for (var i=0; i<na; i++) {
		this.addVertex(arguments[i]);
	}
	return this;
}

/** Adds one edge to receiver
* @param {Raphael3d.Edge} edge new edge
* @returns {Raphael3d.Scene} receiver
*/
Raphael3d.Scene.prototype.addEdge = function(edge) {
	edge.aabb = new Raphael3d.AABB();
	edge.aabbProjected = new Raphael3d.AABB();
	this.edges.push(edge);
	this.initRenderList();
	edge.id = "e"+this.edges.length;
	return this;
}

/** Adds one or several edges to receiver
* @param {Raphael3d.Edge|Array.<Raphael3d.Edge>} var_args (array or argument list of) new edge(s)
* @returns {Raphael3d.Scene} receiver
*/
Raphael3d.Scene.prototype.addEdges = function(var_args) {
	var na = arguments.length;
	if (na == 1 && arguments[0] instanceof Array) {
		var edges = arguments[0];
		var ns = edges.length;
		for (var i=0; i<ns; i++) {
			this.addEdge(edges[i]);
		}
		return this;
	}
	for (var i=0; i<na; i++) {
		this.addEdge(arguments[i]);
	}
	return this;
}

/** Adds one face to receiver
* @param {Raphael3d.Face} face new face
* @returns {Raphael3d.Scene} receiver
*/
Raphael3d.Scene.prototype.addFace = function(face) {
	face.aabb = new Raphael3d.AABB();
	face.aabbProjected = new Raphael3d.AABB();
	this.faces.push(face);
	this.initRenderList();
	face.id = "f"+this.faces.length;
	return this;
}

/** Adds one or several faces to receiver
* @param {Raphael3d.Face|Array.<Raphael3d.Face>} var_args (array or argument list of) new face(s)
* @returns {Raphael3d.Scene} receiver
*/
Raphael3d.Scene.prototype.addFaces = function(var_args) {
	var na = arguments.length;
	if (na == 1 && arguments[0] instanceof Array) {
		var faces = arguments[0];
		var ns = faces.length;
		for (var i=0; i<ns; i++) {
			this.addFace(faces[i]);
		}
		return this;
	}
	for (var i=0; i<na; i++) {
		this.addFace(arguments[i]);
	}
	return this;
}

/** Adds one surface to receiver
* @param {Raphael3d.Surface} surface new surface
* @returns {Raphael3d.Scene} receiver
*/
Raphael3d.Scene.prototype.addSurface = function(surface) {
	this.surfaces.push(surface);
	this.initRenderList();
	return this;
}

/** Adds one or several surfaces to receiver
* @param {Raphael3d.Surface|Array.<Raphael3d.Surface>} var_args (array or argument list of) new surface(s)
* @returns {Raphael3d.Scene} receiver
*/
Raphael3d.Scene.prototype.addSurfaces = function(var_args) {
	var na = arguments.length;
	if (na == 1 && arguments[0] instanceof Array) {
		var surfaces = arguments[0];
		var ns = surfaces.length;
		for (var i=0; i<ns; i++) {
			this.addSurface(surfaces[i]);
		}
		return this;
	}
	for (var i=0; i<na; i++) {
		this.addSurface(arguments[i]);
	}
	return this;
}

/** Sets new material to receiver
* @param {Raphael3d.Material} material
* @returns {Raphael3d.Scene} receiver
*/
Raphael3d.Scene.prototype.setMaterial = function(material) {
	this.material = material;
	return this;
}

/** Updates AABB (axis aligned bounding box) of receiver
*/
Raphael3d.Scene.prototype.updateAABB = function() {
	this.aabb.reset();
	var vertices = this.vertices,
		nv = vertices.length,
		edges = this.edges,
		ne = edges.length,
		faces = this.faces,
		nf = faces.length,
		surfaces = this.surfaces,
		ns = surfaces.length,
		v, e, f, s, v1, v2,
		x,y,z,
		aabb,
		minXf, minYf, minZf,
		maxXf, maxYf, maxZf,
		minX, minY, minZ,
		maxX, maxY, maxZ;
	minX = minY = minZ = Number.POSITIVE_INFINITY;
	maxX = maxY = maxZ = Number.NEGATIVE_INFINITY;
	for (var i=0; i<nv; i++) {
		v = vertices[i];
		x = v.x;
		y = v.y;
		z = v.z;
		minX = Math.min(x,minX);
		minY = Math.min(y,minY);
		minZ = Math.min(z,minZ);
		maxX = Math.max(x,maxX);
		maxY = Math.max(y,maxY);
		maxZ = Math.max(z,maxZ);
	}
	for (var i=0; i<ne; i++) {
		e = edges[i];
		e.updateAABB();
		aabb = e.aabb;
		minX = Math.min(aabb.minX,minX);
		minY = Math.min(aabb.minY,minY);
		minZ = Math.min(aabb.minZ,minZ);
		maxX = Math.max(aabb.maxX,maxX);
		maxY = Math.max(aabb.maxY,maxY);
		maxZ = Math.max(aabb.maxZ,maxZ);
	}	for (var i=0; i<nf; i++) {
		f = faces[i];
		f.updateAABB();
		aabb = f.aabb;
		minX = Math.min(aabb.minX,minX);
		minY = Math.min(aabb.minY,minY);
		minZ = Math.min(aabb.minZ,minZ);
		maxX = Math.max(aabb.maxX,maxX);
		maxY = Math.max(aabb.maxY,maxY);
		maxZ = Math.max(aabb.maxZ,maxZ);
	}
	for (var i=0; i<ns; i++) {
		s = this.surfaces[i];
		s.updateAABB();
		aabb = s.aabb;
		minX = Math.min(aabb.minX,minX);
		minY = Math.min(aabb.minY,minY);
		minZ = Math.min(aabb.minZ,minZ);
		maxX = Math.max(aabb.maxX,maxX);
		maxY = Math.max(aabb.maxY,maxY);
		maxZ = Math.max(aabb.maxZ,maxZ);
	}
	this.aabb.setVals(minX,minY,minZ, maxX,maxY,maxZ);
}



/** Axis aligned bounding box (AABB) implementation
* @property {Raphael3d.Vector3} center center of AABB
* @property {Raphael3d.Vector3} size size fo AABB
* @property {number} diagonalLength diagonal length of AABB
* @property {number} minX minimal x coordinate
* @property {number} minY minimal y coordinate
* @property {number} minZ minimal z coordinate
* @property {number} maxX maxmal x coordinate
* @property {number} maxY maxmal y coordinate
* @property {number} maxZ maxmal z coordinate
* @this Raphael3d.AABB
* @constructor
*/
Raphael3d.AABB = function() {
	this.center = new Raphael3d.Vector3();
	this.size = new Raphael3d.Vector3();
	this.diagonalLength = NaN;
	this.reset();
}

/** Creates new AABB oject
* @returns {Raphael3d.AABB} new AABB object
*/
Raphael3d.AABB.create = function() {
	return new Raphael3d.AABB();
}

/** REsets receiver
*/
Raphael3d.AABB.prototype.reset = function() {
	this.center.x = this.center.y = this.center.z = NaN;
	this.size.x = this.size.y = this.size.z = NaN;
	this.minX = this.minY = this.minZ = NaN;
	this.maxX = this.maxY = this.maxZ = NaN;
}

/** Updates receiver (computes center, size, diagonalLength)
*/
Raphael3d.AABB.prototype.update = function() {
	this.center.x = .5*(this.minX + this.maxX);
	this.center.y = .5*(this.minY + this.maxY);
	this.center.z = .5*(this.minZ + this.maxZ);
	var x = this.maxX - this.minX,
		y = this.maxY - this.minY,
		z = this.maxZ - this.minZ;
	this.size.x = x;
	this.size.y = y;
	this.size.z = z;
	this.diagonalLength = Math.sqrt(x*x + y*y + z*z);
}

/** Set new values to receiver
* @param {number} minX minimal x coordinate
* @param {number} minY minimal y coordinate
* @param {number} minZ minimal z coordinate
* @param {number} maxX maxmal x coordinate
* @param {number} maxY maxmal y coordinate
* @param {number} maxZ maxmal z coordinate
*/
Raphael3d.AABB.prototype.setVals = function(minX,minY,minZ, maxX,maxY,maxZ) {
	this.minX = minX;
	this.minY = minY;
	this.minZ = minZ;
	this.maxX = maxX;
	this.maxY = maxY;
	this.maxZ = maxZ;
	this.update();
}

/** Computes if receiver collide with another AABB
* @param {Raphael3d.AABB} aabb given aabb
* @returns {boolean}
*/
Raphael3d.AABB.prototype.collideWith = function(aabb) {
	return (this.minX < aabb.maxX) && (this.maxX > aabb.minX) && (this.minY < aabb.maxY) && (this.maxY > aabb.minY) && (this.minZ < aabb.maxZ) && (this.maxZ > aabb.minZ);
}

/** Computes if receiver collide with another AABB (considering only x and y coordinates)
* @param {Raphael3d.AABB} aabb given aabb
* @returns {boolean}
*/
Raphael3d.AABB.prototype.collideXYWith = function(aabb) {
	return (this.minX < aabb.maxX) && (this.maxX > aabb.minX) && (this.minY < aabb.maxY) && (this.maxY > aabb.minY);
}





/** MaterialColor
* @class represents material color
* @param {number=} r hex r
* @param {number=} g hex g
* @param {number=} b hex b
* @property {number} r hex r
* @property {number} g hex g
* @property {number} b hex b
* @this Raphael3d.MaterialColor
* @constructor
*/
Raphael3d.MaterialColor = function(r,g,b) {
	this.r = r || 0;
	this.g = g || 0;
	this.b = b || 0;
}

/** Sets attributes of receiver from string
* @param {string} c color
* @returns {Raphael3d.MaterialColor} receiver
*/
Raphael3d.MaterialColor.prototype.fromString = function(c) {
	var color = Raphael.getRGB(c)
	this.r = color.r;
	this.g = color.g;
	this.b = color.b;
	return this;
}

/** Returns new MaterialColor according to given string
* @param {string} c color
* @returns {Raphael3d.MaterialColor} new MaterialColor object
*/
Raphael3d.MaterialColor.FromString = function(c) {
	return new Raphael3d.MaterialColor().fromString(c);
}

/** Material implementation
* @class represents material
* @param {string=} diffuseColor diffuse color of material (under full light)
* @param {string=} ambientColor ambientColor of material (under no light)
* @param {number=} transparency transparency of the material
* @property {Raphael3d.MaterialColor} diffuseColor diffuse color of material (under full light)
* @property {Raphael3d.MaterialColor} ambientColor ambientColor of material (under no light)
* @property {number} transparency transparency of the material
* @this Raphael3d.Material
* @constructor
*/
Raphael3d.Material = function(diffuseColor,ambientColor,transparency) {
	var dc = diffuseColor || "#fff";
	this.diffuseColor = Raphael3d.MaterialColor.FromString(dc);
	var ac = ambientColor;
	if (!ac) {
		this.autosetAmbientColor();
	} else {
		this.ambientColor = Raphael3d.MaterialColor.FromString(ac);
	}
	this.transparency = transparency || 0.;
}

/** Creates new Material object. See {@link Raphael3d.Material} for arguments
* @param {string=} diffuseColor
* @param {string=} ambientColor
* @param {number=} transparency
* @returns {Raphael3d.Material} new Material object
*/
Raphael3d.Material.create = function(diffuseColor,ambientColor,transparency) {
	return new Raphael3d.Material(diffuseColor,ambientColor,transparency);
}

/** Computes actual color according to given relative light
* @param {number=} relLight relative light (0 = no light, ambientColor, 1 = full light, diffuseColor)
* @returns {string} computed color
*/
Raphael3d.Material.prototype.computeColor = function(relLight) {
	relLight = relLight===undefined? 1 : Math.abs(relLight);
	var r = this.ambientColor.r + relLight*(this.diffuseColor.r - this.ambientColor.r);
	var g = this.ambientColor.g + relLight*(this.diffuseColor.g - this.ambientColor.g);
	var b = this.ambientColor.b + relLight*(this.diffuseColor.b - this.ambientColor.b);
	return Raphael.rgb(r,g,b);
}

/** Sets default ambient color of receiver
* @returns {Raphael3d.Material} receiver
* @private
*/
Raphael3d.Material.prototype.autosetAmbientColor = function() {
	var r = this.diffuseColor.r,
		g = this.diffuseColor.g,
		b = this.diffuseColor.b;
	this.ambientColor = new Raphael3d.MaterialColor(.5*r, .5*g, .5*b);
	return this;
}






/** 3D viewer implementation
* @class represents 3D viewer
* @extends Raphael.fn
* @param {number} x x coordinate
* @param {number} y y coordinate
* @param {number} width width
* @param {number} height height
* @param {Object=} attrs Raphael.rect attrs
* @property {Raphael.Scene} scene
* @property {boolean} skipBackFace how to render back faces
* @this Raphael.fn.Viewer
* @constructor
*/
Raphael.fn.Viewer = function(x,y,width,height,attrs) {
	attrs = attrs || {};
	/** @alias Raphael.fn.Viewer.prototype */
	var ret = this.rect(x,y,width,height).attr({"cursor":"move","fill":"#000","opacity":.0}).attr(attrs);
	ret.scene = null;
	/** What to do when rotated. Empty function initially */
	ret.onUpdate = function() {};
	ret.skipBackFace = true;

	/** Sets new scene to receiver
	* @param {Raphael3d.Scene} scene new scene
	* @returns {Raphael.fn.Viewer} receiver
	*/
	ret.setScene = function(scene) {
		this.scene = scene;
		return this;
	};

	/** Updates receiver (updates and render scene)
	* @returns {Raphael.fn.Viewer} receiver
	*/
	ret.update = function() {
		if (!this.scene) { return this; }
		this.scene.update();
		this.render();
		return this;
	}

	/** Render receiver's scene
	* @returns {Raphael.fn.Viewer} receiver
	*/
	ret.render = function() {
		if (!this.scene) { return this; }
		if (this.scene.path) {
			this.scene.path.insertBefore(this);
		}
		this.scene.render(this.skipBackFace);
		return this;
	}

	/** Fits camera focalPoint and zoom to fit the receiver's scene
	* @returns {Raphael.fn.Viewer} receiver
	*/
	ret.fit = function() {
		if (!this.scene) { return this; }
		this.centering();
		var attrs = this.attr(),
			w = attrs.height,
			h = attrs.height,
			s = Math.max(w,h),
			d = this.scene.aabb.diagonalLength,
			f = .9 * s / d;
		this.scene.camera.setZoomFactor(f);
		this.scene.camera.setDist(2*d);
		return this;
	}

	/** Sets camera focalPoint to the center of receiver's scene and sets scene.lcs to have origin at receiver's center
	* @returns {Raphael.fn.Viewer} receiver
	*/
	ret.centering = function() {
		if (!this.scene) { return this; }
		this.scene.setCenter();
		this.scene.lcs.beIdentity();
		var attrs = this.attr(),
			x = attrs.x,
			y = attrs.y,
			w = attrs.width,
			h = attrs.height;
		this.scene.lcs.translate(x+.5*width, y+.5*height, 0);
		return this;
	}

	/**
	* @private
	*/
	ret.drag(
		function(dx,dy) {
			if (!this.scene) { return; }
			this.scene.camera.rotateY(.01*(dx-this.dx),this.scene.center);
			this.scene.camera.rotateX(.01*(dy-this.dy),this.scene.center);
			this.update();
			this.onUpdate();
			this.dx = dx;
			this.dy = dy;
		},
		function() { this.dx = this.dy = 0.; }
	);

	return ret;
}







/** Function to read obj file to create surface. Lines starting with '#' are comments, 'v x y x' lines (starting with 'v' char) are vertices with coordinates and 'f i j k' lines (starting with 'f' char) are faces with vertices indices (numbering from 1). See {@link http://mech.fsv.cvut.cz:~/stransky/software/raphael3d/teapot.obj}
* @param {string} url url of the file
* @param {Object=} faceAttrs face attrs
* @param {Object=} edgeAttrs edge attrs
* @returns {Raphael3d.Surface}
*/
Raphael3d.readObjFile = function(url,paper,faceAttrs,edgeAttrs) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET",url,false);
	xmlhttp.send(null);
	var content = xmlhttp.responseText.split("\n");
	var vertices = [];
	var faces = [];
	var cl = content.length, split, x,y,z, v1,v2,v3;
	for (var i=0; i<cl; i++) {
		if (content[i].charAt(0) == '#') { continue; } // comment
		split = content[i].split(' ');
		if (split[0] == 'v') { // vertex
			x = Number(split[1]);
			y = Number(split[2]);
			z = Number(split[3]);
			vertices.push( new Raphael3d.Vertex(x,y,z) );
		} else if (split[0] == 'f') { // face
			v1 = vertices[split[1]-1];
			v2 = vertices[split[2]-1];
			v3 = vertices[split[3]-1];
			faces.push( new Raphael3d.Face([v1,v2,v3],paper,faceAttrs,edgeAttrs) );
		} else { // no more implementation
		}
	}
	var ret = new Raphael3d.Surface(vertices,faces,paper);
	return ret;
}





/** Function returning axes cross
* @param {number} x x coordinate
* @param {number} y y coordinate
* @param {number} z z coordinate
* @param {number} dx x lenght
* @param {number} dy y lenght
* @param {number} dz z lenght
* @param {Raphael.Paper} paper
* @param {Object=} edgeAttrs attrs of created edges
* @returns {{vertices:Array.<Raphael3d.Vertex>,edges:Array.<Raphael3d.Edge>}} {vertices,edges} array of newly created vertices and edges
*/
Raphael3d.AxesCross = function(x,y,z,dx,dy,dz,paper,edgeAttrs) {
	var v0 = new Raphael3d.Vertex(x,y,z),
		vx = new Raphael3d.Vertex(x+dx,y,z),
		vy = new Raphael3d.Vertex(x,y+dy,z),
		vz = new Raphael3d.Vertex(x,y,z+dz),
		vertices = [v0,vx,vy,vz],
		edges = [
			v0.connectWith(vx,paper,edgeAttrs),
			v0.connectWith(vy,paper,edgeAttrs),
			v0.connectWith(vz,paper,edgeAttrs)
		];
	return {vertices:vertices, edges:edges};
}


/** Some geometric functions (for easy intersection computation for instance)
* @namespace
*/
Raphael3d.Geom = {};

/** Line
* @class represents line in 3D space
* @param {Raphael3d.Vector3=} point one point of the line
* @param {Raphael3d.Vector3=} dir directon vector of the line
* @property {Raphael3d.Vector3} point one point of the line
* @property {Raphael3d.Vector3} dir directon vector of the line
* @this Raphael3d.Geom.Line
* @constructor
*/
Raphael3d.Geom.Line = function(point,dir) {
	this.point = point || new Raphael3d.Vector3(0,0,0);
	this.dir = dir || new Raphael3d.Vector3(1,0,0);
}

/** Creates new Line object. See {@link Raphael3d.Geom.Line} for arguments
* @param {Raphael3d.Vector3=} point
* @param {Raphael3d.Vector3=} dir
* @returns {Raphael3d.Geom.Line} new Line object
*/
Raphael3d.Geom.Line.create = function(point,dir) {
	return new Raphael3d.Geom.Line(point,dir);
}

/*
Raphael3d.Geom.Line.prototype.computeIntersectionWithLine = function(line) {
	// TODO
}
*/

/** Computes intersection of receiver with a given plane
* @param {Raphael3d.Geom.Plane} plane given plane
* @returns {Raphael3d.Vector3|null} intersection point
*/
Raphael3d.Geom.Line.prototype.computeIntersectionWithPlane = function(plane) {
	var a = this.point, u = this.dir, n = plane.normal, d = plane.d;
	var frac = u.x*n.x + u.y*n.y + u.z*n.z;
	if (Math.abs(frac) < Raphael3d.TOL) {
		return null;
	}
	var t = ( -d - n.x*a.x - n.y*a.y - n.z*a.z ) / frac;
	return new Raphael3d.Vector3(a.x + t*u.x, a.y + t*u.y, a.z + t*u.z);
}

// e.g. z=5, string="z", val=5
/** Computes intersection of receiver with a given axis aligned plane
* @param {string} string 'x', plane x=val, 'y', plane y=val, 'z' plane z=val
* @param {number} val see 'string' param
* @returns {Raphael3d.Vector3|null} intersection point
*/
Raphael3d.Geom.Line.prototype.computeIntersectionWithAAPlane = function(string,val) {
	val = val || 0.;
	var t;
	var d = this.dir, p = this.point;
	if (string == "x") {
		if (Math.abs(d.x) < Raphael3d.TOL) {
			return null;
		}
		t = (val - p.x) / d.x;
	} else if (string == "y") {
		if (Math.abs(d.y) < Raphael3d.TOL) {
			return null;
		}
		t = (val - p.y) / d.y;
	} else if (string == "z") {
		if (Math.abs(d.z) < Raphael3d.TOL) {
			return null;
		}
		t = (val - p.z) / d.z;
	} else {
		return null;
	}
	return new Raphael3d.Vector3(p.x+t*d.x, p.y+t*d.y, p.z+t*d.z);
}

/** Sets receiver attributes according to given points
* @param {Raphael3d.Vector3|Raphael3d.Vertex} p1 1st point
* @param {Raphael3d.Vector3|Raphael3d.Vertex} p2 2nd point
* @returns {Raphael3d.Geom.Line} receiver
*/
Raphael3d.Geom.Line.prototype.fromTwoPoints = function(p1,p2) {
	this.point.beCopyOf(p1);
	this.dir.beCopyOf(p2.sub(p1));
	this.dir.normalize();
	return this;
}

/** Sets receiver attributes according to given points
* @param {Raphael3d.Edge} edge given edge
* @returns {Raphael3d.Geom.Line} receiver
*/
Raphael3d.Geom.Line.prototype.fromEdge = function(edge) {
	var v1 = edge.v1, v2 = edge.v2;
	return this.fromTwoPoints(v1,v2);
}

/** Sets receiver attributes according to given points
* @param {Raphael3d.Vector3} p1 1st point
* @param {Raphael3d.Vector3} p2 2nd point
* @returns {Raphael3d.Geom.Line} new Line object
*/
Raphael3d.Geom.Line.FromTwoPoints = function(p1,p2) {
	return new Raphael3d.Geom.Line().fromTwoPoints(p1,p2);
}

/** Sets receiver attributes according to given edge
* @param {Raphael3d.Edge} edge given edge
* @returns {Raphael3d.Geom.Line} new Line object
*/
Raphael3d.Geom.Line.FromEdge = function(edge) {
	return new Raphael3d.Geom.Line().fromEdge(edge);
}


/** Plane
* @class represents plane in 3D space
* @property {Raphael3d.Vector3} normal normal of the plane
* @property {number} d d in equantion normal.x*x+normal.y*y+normal.z*z+d=0
* @this Raphael3d.Geom.Plane
* @constructor
*/
Raphael3d.Geom.Plane = function() {
	this.normal = new Raphael3d.Vector3(1,0,0);
	this.d = 0.;
}

/** Creates new Plane object
* @returns {Raphael3d.Geom.Plane} new plane object
*/
Raphael3d.Geom.Plane.create = function() {
	return new Raphael3d.Geom.Plane();
}

/** Chenks if receiver contains given point
* @param {Raphael3d.Vector3|Raphael3d.Vertex} pt
* @returns {boolean}
*/
Raphael3d.Geom.Plane.prototype.containsPoint = function(pt) {
	var n = this.normal;
	return Math.abs(n.x*pt.x + n.y*pt.y + n.z*pt.z + this.d) < Raphael3d.TOL;
}

/** Sets receiver attributes according to given points
* @param {Raphael3d.Vector3|Raphael3d.Vertex} p1 1st point
* @param {Raphael3d.Vector3|Raphael3d.Vertex} p2 2nd point
* @param {Raphael3d.Vector3|Raphael3d.Vertex} p3 3rd point
* @returns {Raphael3d.Geom.Plane} receiver
*/
Raphael3d.Geom.Plane.prototype.fromThreePoints = function(p1,p2,p3) {
	var v1 = p2.sub(p1), v2 = p3.sub(p1);
	this.normal = v1.cross(v2);
	this.normal.normalize();
	var nx = this.normal.x, ny = this.normal.y, nz = this.normal.z;
	var x = p1.x, y = p1.y, z = p1.z;
	this.d = -nx*x - ny*y - nz*z;
	return this;
}

/** Computes intersection woth given line
* @param {Raphael3d.Geom.Line} line given line
* @returns {Raphael3d.Vector3|null} intersection
*/
Raphael3d.Geom.Plane.prototype.computeIntersectionWithLine = function(line) {
	return line.computeIntersectionWithPlane(this);
}

/*
Raphael3d.Geom.Plane.prototype.computeIntersectionWithPlane = function(plane) {
	// TODO
}
*/

/** Sets receiver attributes according to given face
* @param {Raphael3d.Face} face given face
* @returns {Raphael3d.Geom.Plane} receiver
*/
Raphael3d.Geom.Plane.prototype.fromFace = function(face) {
	var vertices = face.vertices, nv = vertices.length;
	var v1 = vertices[0], v2 = vertices[1], v3 = vertices[nv-1];
	return this.fromThreePoints(v1,v2,v3);
}

/** Returns new Plane object according to given points
* @param {Raphael3d.Vector3|Raphael3d.Vertex} p1 1st point
* @param {Raphael3d.Vector3|Raphael3d.Vertex} p2 2nd point
* @param {Raphael3d.Vector3|Raphael3d.Vertex} p3 3rd point
* @returns {Raphael3d.Geom.Plane} new plane object
*/
Raphael3d.Geom.Plane.FromThreePoints = function(p1,p2,p3) {
	return new Raphael3d.Geom.Plane().fromThreePoints(p1,p2,p3);
}

/** Returns new Face object according to given face
* @param {Raphael3d.Face} face given face
* @returns {Raphael3d.Geom.Plane} new Plane object
*/
Raphael3d.Geom.Plane.FromFace = function(face) {
	return new Raphael3d.Geom.Plane().fromFace(face);
}


/** Checks equality of receiver with given plane
* @param {Raphael3d.Geom.Plane} plane given plane
* @returns {boolean}
*/
Raphael3d.Geom.Plane.prototype.isEqualTo = function(plane) {
	var n = this.normal,
		ax = Math.abs(n.x),
		ay = Math.abs(n.y),
		az = Math.abs(n.z),
		mi;
	if (ax > ay && ax > az) {
		mi = "x";
	} else if (ay > ax && ay > az) {
		mi = "y";
	} else {
		mi = "z";
	}
	var pn = plane.normal,
		ratio = pn[mi] / n[mi];
	return Math.abs(pn.x/n.x-ratio)<Raphael3d.TOL && Math.abs(pn.y/n.y-ratio)<Raphael3d.TOL && Math.abs(pn.z/n.z-ratio)<Raphael3d.TOL && Math.abs(this.d/plane.d-ratio)<Raphael3d.TOL;
}

/** OrientedLine2d
* @class represents oriented line in xy plane
* @param {{x:number,y:number}=} point one point of the line
* @param {{x:number,y:number}=} dir directon vector of the line
* @property {{x:number,y:number}} point one point of the line
* @property {{x:number,y:number}} dir directon vector of the line
* @this Raphael3d.Geom.Line
* @constructor
*/
Raphael3d.Geom.OrientedLine2d = function(point,dir) {
	this.point = point || {x:0,y:0};
	this.dir = dir || {x:1,y:0};
}

/** Creates new OrientedLine2d object. See {@link Raphael3d.Geom.OrientedLine2d} for arguments
* @param {{x:number,y:number}=} point
* @param {{x:number,y:number}=} dir
* @returns {Raphael3d.Geom.OrientedLine2d} new OrientedLine2d object
*/
Raphael3d.Geom.OrientedLine2d.create = function(point,dir) {
	return new Raphael3d.Geom.OrientedLine2d(point,dir);
}

/** Checks if receiver has intersection with projection of given edge
* @param {Raphael3d.Edge} edge given edge
* @returns {boolean}
*/
Raphael3d.Geom.OrientedLine2d.prototype.hasIntersectionWithProjEdge = function(edge) {
	var v1 = edge.v1.projected, v2 = edge.v2.projected, p = this.point;
	var uEdge = {x:v2.x-v1.x, y:v2.y-v1.y};
	var i = Raphael3d.Geom.compute2dEdgeEdgeIntersection(this.point,this.dir,v1,uEdge);
	if (!i) {
		return false;
	}
	if (i.parallel) {
		return false;
	}
	var param1 = i.param1, param2 = i.param2, t=Raphael3d.TOL;
	return (param1>=-t && param2>=-t && param2<=1.+t);
}

/* TODO
Raphael3d.Geom.OrientedLine2d.prototype.fromPointAndDir = function(point,dir) {
	var nx = -direction.y, ny = dir.x;
	this.c = - nx*point.x - ny*point.y;
	return this.fromPointAndNormal(point,{x:nx,y:ny});
}

Raphael3d.Geom.OrientedLine2d.prototype.fromTwoPoints = function(p1,p2) {
	var ux = p2.x - p1.x, uy = p2.y - p1.y;
	return this.fromPointAndDir(p1,{x:ux,y:uy});
}

Raphael3d.Geom.OrientedLine2d.FromTwoPoints = function(p1,p2) {
	return new Raphael3d.Geom.OrientedLine2d().fromTwoPoints(p1,p2);
}
*/


/** Function to ocmpute edge intersection in xy plane
* @param {{x:number,y:number}} p1 1st point
* @param {{x:number,y:number}} u1 1st direction vector
* @param {{x:number,y:number}} p2 2nd point
* @param {{x:number,y:number}} u2 2nd direction vector
* @returns {{param1:number,param2:number,x:number,y:number,parallel:boolean}|null} {param1,param2,x,y,parallel} param1,2, params of equation intersecton=p1+param1*u1=p2+param2*u2, x,y coordinates, parallel if given edges are parallel
*/
Raphael3d.Geom.compute2dEdgeEdgeIntersection = function(p1,u1,p2,u2) {
	var param2,param1, parallel=false;
	if (Math.abs(u1.x) < Raphael3d.TOL) { // ab parallel with y axis
		if (Math.abs(u2.x) < Raphael3d.TOL) { // cd also parallel with y axis
			if (Math.abs(p1.x - p2.x) > Raphael3d.TOL) { return null; } // no intersection
			param1 = -p1.y / u1.y;
			param2 = -p2.y / u2.y;
			parallel = true;
		}
		param2 = (p1.x - p2.x) / u2.x;
		param1 = (p2.y - p1.y + param2*u2.y) / u1.y;
	} else if (Math.abs(u1.y) < Raphael3d.TOL) { // ab parallel with x axis
		if (Math.abs(u2.y) < Raphael3d.TOL) { // cd also parallel with x axis
			if (Math.abs(p1.y - p2.y) > Raphael3d.TOL) { return null; } // no intersection
			param1 = -p1.x / u1.x;
			param2 = -p2.x / u2.x;
			parallel = true;
		}
		param2 = (p1.y - p2.y) / u2.y;
		param1 = (p2.x - p1.x + param2*u2.x) / u1.x;
	} else if (Math.abs(u1.y/u1.x*u2.x - u2.y) < Raphael3d.TOL) { // parallel
		param1 = -p1.x / u1.x;
		param2 = -p2.x / u2.x;
		parallel = true;
	} else {
		param2 = (p2.y - p1.y - u1.y/u1.x*(p2.x - p1.x)) / (u1.y/u1.x*u2.x - u2.y);
		param1 = (p2.x - p1.x + param2*u2.x) / u1.x;
	}
	return {param1:param1, param2:param2, x:p1.x+param1*u1.x, y:p1.y+param1*u1.y, parallel:parallel};
}


/** @private */
Raphael3d.temp = {
	line: new Raphael3d.Geom.Line(),
	plane: new Raphael3d.Geom.Plane()
}
