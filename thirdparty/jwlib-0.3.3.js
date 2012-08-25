/*!
    jWidget Lib 0.3.3 with standard prototypes extension (non-package-safe build)
    
    https://github.com/enepomnyaschih/jwlib
    
    Copyright (C) 2012 Egor Nepomnyaschih
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    
    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
    JW namespace with various utility methods.
    
    Copyright (C) 2012 Egor Nepomnyaschih
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    
    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

if (typeof JW !== "undefined")
    throw new Error("Can't initialize jWidget Lib: JW namespace already defined");

(typeof window === "undefined" ? global : window).JW = function(x)
{
    if (typeof x === "string")
        return new JW.String(x);
    
    if (typeof x === "function")
        return new JW.Function(x);
    
    if (JW.isArray(x))
        return new JW.Array(x);
    
    return x;
}

JW.global = (typeof window === "undefined" ? global : window);

/**
 * Extends target object with fields of source objects.
 * Overrides defined values.
 */
JW.apply = function(target /*, sources */)
{
    for (var i = 1; i < arguments.length; ++i)
    {
        var source = arguments[i];
        if (!source)
            continue;
        
        for (var key in source)
        {
            if (typeof source[key] !== "undefined")
                target[key] = source[key];
        }
    }
    
    return target;
}

JW.apply(JW, {
    /**
     * Define namespace.
     * Examples:
     * JW.ns("BBB.AAA");
     * JW.ns("JW.MyNS.A");
     */
    ns: function(
        /* ns */) // String
    {
        if (arguments.length == 0)
            return;
        
        if (arguments.length > 1)
            return JW.each(JW.args(arguments), JW.Function.withArgs(JW.ns, "\0"));
        
        var ns = arguments[0];
        if (JW.isArray(ns))
            return JW.each(ns, JW.Function.withArgs(JW.ns, "\0"));
        
        var p = ns.split(".");
        var r = JW.global;
        for (var i = 0; i < p.length; ++i)
        {
            var n = p[i];
            r[n] = r[n] || {};
            r = r[n];
        }
    },
    
    /**
     * Test whether v is undefined.
     */
    isUndefined: function(v)
    {
        return v === undefined;
    },
    
    /**
     * Test whether v is not undefined.
     */
    isDefined: function(v)
    {
        return v !== undefined;
    },
    
    /**
     * Test whether v is null.
     */
    isNull: function(v)
    {
        return v === null;
    },
    
    /**
     * Test whether v is not undefined or null.
     */
    isSet: function(v)
    {
        return (v !== undefined) && (v !== null);
    },
    
    /**
     * Test whether v is integer number.
     */
    isInt: function(v)
    {
        return (typeof v === "number") && Math.round(v) === v;
    },
    
    /**
     * Test whether v is number.
     */
    isNumber: function(v)
    {
        return typeof v === "number";
    },
    
    /**
     * Test whether v is string.
     */
    isString: function(v)
    {
        return typeof v === "string";
    },
    
    /**
     * Test whether v is boolean.
     */
    isBoolean: function(v)
    {
        return typeof v === "boolean";
    },
    
    /**
     * Test whether v is function.
     */
    isFunction: function(v)
    {
        return typeof v === "function";
    },
    
    /**
     * Test whether v is array.
     */
    isArray: function(v)
    {
        return Object.prototype.toString.apply(v) === '[object Array]';
    },
    
    /**
     * Test whether v is object.
     */
    isObject: function(v)
    {
        return Object.prototype.toString.apply(v) === '[object Object]';
    },
    
    /**
     * Test whether v is number.
     */
    isRegExp: function(v)
    {
        return Object.prototype.toString.apply(v) === '[object RegExp]';
    },
    
    /**
     * Test whether v is number.
     */
    isDate: function(v)
    {
        return Object.prototype.toString.apply(v) === '[object Date]';
    },
    
    /**
     * Test whether v is not undefined, null, false, 0 or empty string.
     */
    isBlank: function(v)
    {
        return !v;
    },
    
    /**
     * If v is defined, returns one, else returns d as default value.
     */
    def: function(v, d)
    {
        return JW.isDefined(v) ? v : d;
    },
    
    /**
     * If v is set, returns one, else returns d as default value.
     */
    defn: function(v, d)
    {
        return JW.isSet(v) ? v : d;
    },
    
    /**
     * Extends target object with fields of source objects.
     * Does not override defined values.
     */
    applyIf: function(target /*, sources */)
    {
        for (var i = 1; i < arguments.length; ++i)
        {
            var source = arguments[i];
            if (!source)
                continue;
            
            for (var key in source)
            {
                if (JW.isDefined(source[key]) && !JW.isDefined(target[key]))
                    target[key] = source[key];
            }
        }
        
        return target;
    },
    
    /**
     * Extends target object with fields of source objects.
     * Does not override defined and not null values.
     */
    applyIfn: function(target /*, sources */)
    {
        for (var i = 1; i < arguments.length; ++i)
        {
            var source = arguments[i];
            if (!source)
                continue;
            
            for (var key in source)
            {
                if (JW.isDefined(source[key]) && !JW.isSet(target[key]))
                    target[key] = source[key];
            }
        }
        
        return target;
    },
    
    /**
     * Builds new object from source removing all undefined values.
     */
    clean: function(source)
    {
        var result = {};
        for (var i in source)
        {
            if (JW.isDefined(source[i]))
                result[i] = source[i];
        }
        return result;
    },
    
    /**
     * Builds new object from source removing all undefined and null values.
     */
    cleann: function(source)
    {
        var result = {};
        for (var i in source)
        {
            if (JW.isSet(source[i]))
                result[i] = source[i];
        }
        return result;
    },
    
    /**
     * Converts arguments object to array.
     */
    args: function(
        a,      // [required] Arguments
        index,  // [optional] Integer, starting index to slice arguments
        count)  // [optional] Integer, count of arguments to slice
    {
        index = index || 0;
        count = count || a.length - index;
        
        var r = [];
        for (var i = 0; i < count; ++i)
            r.push(a[index + i]);
        
        return r;
    },
    
    /**
     * Empty function.
     */
    emptyFn: function() {},
    
    /**
     * Values comparison function (for sorting).
     */
    cmp: function(x, y, caseInsensitive)
    {
        if (typeof x === "boolean" && typeof y === "boolean")
            return x ? (y ? 0 : 1) : (y ? -1 : 0);
        
        if (JW.isArray(x) && JW.isArray(y))
            return JW.Array.cmp(x, y, caseInsensitive);
        
        if (caseInsensitive)
        {
            if (typeof x === "string")
                x = x.toLowerCase();
            
            if (typeof y === "string")
                y = y.toLowerCase();
        }
        
        if (x > y) return 1;
        if (x < y) return -1;
        return 0;
    },
    
    /**
     * Returns obj[field] where field is "xxx.xxx.xxx".
     * Returns undefined if can't retrieve specified value.
     * Returns obj if field is empty.
     */
    get: function(obj, field, def)
    {
        if (!field)
            return JW.def(obj, def);
        
        field = field.split(".");
        for (var i = 0; i < field.length; ++i)
        {
            if (!obj)
                return def;
            
            obj = obj[field[i]];
        }
        
        return JW.def(obj, def);
    },
    
    /**
     * Converts configuration option to array.
     * If v is not set, returns empty array.
     * If v is array, returns v, else returns [v].
     */
    makeArray: function(v)
    {
        return JW.isArray(v) ? v : JW.isSet(v) ? [v] : [];
    },
    
    /**
     * Returns class or finds it by name.
     */
    makeClass: function(v)
    {
        return (typeof v === "string") ? JW.get(JW.global, v) : v;
    },
    
    /**
     * Universal equality checker.
     * Can compare objects with any structure (even looped).
     */
    equal: function(x, y, recursively, strict)
    {
        var pairs = [];
        var eq = strict ? JW.seq : JW.eq;
        var req;
        
        function rec(x, y)
        {
            // Either not object/array
            if (typeof x !== "object" || typeof y !== "object")
                return eq(x, y);
            
            // May be the same?
            if (x === y)
                return true;
            
            // May be have different type? (object/array)
            var xa = JW.isArray(x);
            var ya = JW.isArray(y);
            
            if (xa !== ya)
                return false;
            
            // May be this is infinite inclusion?
            for (var i = 0; i < pairs.length; ++i)
            {
                if ((pairs[i][0] === x && pairs[i][1] === y) ||
                    (pairs[i][0] === y && pairs[i][1] === x))
                    return true;
            }
            
            pairs.push([ x, y ]);
            
            // May be they are both arrays?
            if (xa)
            {
                if (x.length !== y.length)
                    return false;
                
                for (var i = 0; i < x.length; ++i)
                {
                    if (!req(x[i], y[i]))
                        return false;
                }
                
                return true;
            }
            
            // They are objects!
            var keys = {};
            
            for (var i in x)
            {
                keys[i] = true;
                if (!req(x[i], y[i]))
                    return false;
            }
            
            for (var i in y)
            {
                if (!keys[i])
                    return false;
                delete keys[i];
            }
            
            for (var i in keys)
                return false;
            
            return true
        }
        
        req = recursively ? rec : eq;
        
        return rec(x, y);
    },
    
    /**
     * Compare two values.
     */
    eq: function(x, y)
    {
        return x == y;
    },
    
    /**
     * Compare two values strictly.
     */
    seq: function(x, y)
    {
        return x === y;
    },
    
    /**
     * Calculates unsigned modulo value in [0, mod).
     */
    mod: function(value, mod)
    {
        return value - mod * Math.floor(value / mod);
    },
    
    /**
     * Calculates signed modulo value in [-mod/2, mod/2).
     */
    smod: function(value, mod)
    {
        return value - mod * Math.round(value / mod);
    },
    
    /**
     * Returns value sign (-1, 0, or 1).
     */
    sgn: function(value)
    {
        return !value ? 0 : value > 0 ? 1 : -1;
    },
    
    /**
     * Returns non-zero value sign (-1, or 1)
     */
    sgnnz: function(value)
    {
        return value >= 0 ? 1 : -1;
    },
    
    /**
     * Get field value.
     * If field name is started with "-", returns variable value.
     * Else tries to run getter method or returns variable value.
     */
    getField: function(target, field)
    {
        if (!JW.isSet(field))
            return null;
        
        if (!field)
            return target;
        
        if (field.charAt(0) === "-")
            return JW.get(target, field.substr(1));
        
        var m = "get" + JW.String.capitalize(field);
        if (typeof target[m] === "function")
            return target[m]();
        
        return JW.get(target, field);
    },
    
    /**
     * Set field value.
     * If field name is started with "-", changes variable value.
     * Else tries to run setter method or changes variable value.
     * Does nothing if value is already the same strictly.
     */
    setField: function(target, field, value)
    {
        if (!field)
            return target;
        
        if (JW.getField(target, field) === value)
            return target;
        
        if (field.charAt(0) === "-")
        {
            target[field.substr(1)] = value;
            return target;
        }
        
        var m = "set" + JW.String.capitalize(field);
        if (typeof target[m] === "function")
        {
            target[m](value);
            return target;
        }
        
        target[field] = value;
        return target;
    },
    
    /**
     * Replaces all special characters from text to put it into html properly.
     */
    htmlEncode: function(text)
    {
        return JW.String.htmlEncode(text);
    },
    
    /**
     * Back function to htmlEncode.
     */
    htmlDecode: function(text)
    {
        return JW.String.htmlDecode(text);
    },
    
    /**
     * Removes all <script> tags from html to prevent scripting.
     */
    removeScripts: function(text)
    {
        return JW.String.removeScripts(text);
    },
    
    /**
     * Shortens string to specified length using ellipsis.
     */
    ellipsis: function(
        text,       // [required] String
        length,     // [required] Integer, string length to shorten to
        ellipsis)   // [optional] String, defaults to "..."
    {
        return JW.String.ellipsis(text, length, ellipsis);
    },
    
    /**
     * Prepends string by specified symbols till specified length.
     */
    prepend: function(
        text,       // [required] String
        length,     // [required] Integer, string length to stretch to
        ch)         // [required] String, symbol to prepend
    {
        return JW.String.ellipsis(text, length, ch);
    },
    
    /**
     * Takes first symbol in string to upper case.
     */
    capitalize: function(text)
    {
        return JW.String.capitalize(text);
    },
    
    /**
     * Converts all hyphen/lowercase pairs to uppercase symbols.
     */
    camel: function(text)
    {
        return JW.String.camel(text);
    },
    
    /**
     * Converts all uppercase letters to hyphen/lowercase pairs.
     */
    hyphen: function(text)
    {
        return JW.String.hyphen(text);
    },
    
    /**
     * Removes all whitespaces at the beginning and at the end.
     */
    trim: function(text)
    {
        return JW.String.trim(text);
    },
    
    /**
     * Returns function which has scope instead of first argument.
     */
    enscope: function(callback)
    {
        return function() {
            var args = [ this ];
            for (var i = 0; i < arguments.length; ++i)
                args.push(arguments[i]);
            
            return callback.apply(this, args);
        }
    },
    
    /**
     * Returns function which has first argument instead of scope.
     */
    descope: function( // Function
        callback,  // [required] Function
        converter) // [optional] Function
    {
        if (converter)
        {
            return function(target) {
                return callback.apply(converter(target), JW.args(arguments, 1));
            }
        }
        else
        {
            return function(target) {
                return callback.apply(target, JW.args(arguments, 1));
            }
        }
    },
    
    /**
     * Returns method of flyweight based on direct method.
     */
    enfly: function( // Function
        callback) // [required] Function
    {
        return function() {
            return callback.apply(this.base, arguments);
        }
    },
    
    /**
     * Populates flyweight class with methods.
     */
    extendFly: function( // Function
        target         // Function
        /* sources */) // Object
    {
        for (var i = 1; i < arguments.length; ++i)
        {
            var source = arguments[i];
            for (var key in source)
                target.prototype[key] = JW.enfly(source[key]);
        }
        
        return target;
    }
});

/*
    JW simple inheritance.
    
    Copyright (C) 2012 Egor Nepomnyaschih
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    
    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.ClassUtil = {
    /**
     * Base class. Constructor is "init" method.
     */
    Class: function()
    {
        if (this.init)
            this.init.apply(this, arguments);
        
        return this;
    },
    
    /**
     * Create empty class.
     */
    newClass: function()
    {
        var cl = function()
        {
            cl.superclass.constructor.apply(this, arguments);
            return this;
        }
        
        return cl;
    },
    
    /**
     * Class inheritance function.
     * 
     * Arguments purposes depend on their types:
     * extend() - create JW.Class subclass
     * extend(body:Object) - create JW.Class subclass with specified body
     * extend(supc:Function) - create supc subclass
     * extend(supc:Function, body:Object) - create supc with specified body
     * extend(subc:Function, supc:Function) - inherits subc from supc
     * extend(subc:Function, supc:Function, body:Object) - inherits subc from supc with specified body
     * 
     * Function returns subclass always.
     */
    extend: function(a, b, c)
    {
        var subc, supc, body;
        
        if (!a || typeof a == "object")
        {
            if (c)
                throw "Can't extend: subclass is undefined";
            
            if (b)
                throw "Can't extend: superclass is undefined";
            
            subc = JW.ClassUtil.newClass();
            supc = JW.ClassUtil.Class;
            body = a;
        }
        else if (!b || typeof b == "object")
        {
            if (c)
                throw "Can't extend: superclass is undefined";
            
            subc = JW.ClassUtil.newClass();
            supc = a;
            body = b;
        }
        else
        {
            subc = a;
            supc = b;
            body = c;
        }
        
        var F = function(){};
        
        F.prototype = supc.prototype;
        subc.prototype = new F();
        subc.prototype.constructor = subc;
        subc.superclass = supc.prototype;
        
        subc.extend = function(a, b) {
            return JW.ClassUtil.extend(subc, a, b);
        }
        
        subc.create = function(a) {
            return (a instanceof subc) ? a : new subc(a);
        }
        
        for (var i in body)
            subc.prototype[i] = JW.ClassUtil.extendMethod(body[i], supc.prototype[i]);
        
        return subc;
    },
    
    /**
     * Create subclass method. Adds this._super call support.
     */
    extendMethod: function(sub, sup)
    {
        if (typeof sup !== "function" ||
            typeof sub !== "function" ||
            sub.superclass)
            return sub;
        
        return function()
        {
            var tmp = this._super;
            this._super = sup;
            var result = sub.apply(this, arguments);
            this._super = tmp;
            return result;
        }
    }
};

JW.Class = JW.ClassUtil.Class;
JW.ClassUtil.extend(JW.Class, Object);

JW.Class.prototype.init = function() {};
JW.Class.prototype.destroy = function() {};

/*
    JW observer pattern implementation.
    
    Copyright (C) 2012 Egor Nepomnyaschih
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    
    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * Event object.
 */
JW.Event = JW.Class.extend({
    type    : null, // [required][read-only] String
    target  : null, // [required][read-only] JW.Observable
    
    init: function(type, target)
    {
        this.type   = type;
        this.target = target;
    }
});

/**
 * Base observable object.
 * Used to dispatch events.
 */
JW.Observable = JW.Class.extend({
    __listeners : null, // [private] Map from type to Array of JW.Observable.Listener
    __observers : null, // [private] JW.Map from scope to Array of JW.Observable.Listener
    __flags     : null, // [private] Map from type to Mixed (true - registered, Array - event args)
    
    destroy: function()
    {
        this.purgeAll();
    },
    
    /**
     * Add event handler.
     * Supports many various signatures.
     */
    bind: function(
    /* Signature 1 */
        type,       // [required] String, event type
        handler,    // [required] Function, event handler
        scope,      // [optional] Object, recommended. If specified, event handler will be called in specified scope. Also the handler will be registered to remove on purge(scope) or unbind (type, handler, scope) call
        disposable  // [optional] Boolean, set to true to auto-unbind the listener as soon as event is triggered first time
    
    /* Signature 2
        listeners   // Each argument is Object similar to JW.Observable.Listener */
    
    /* Signature 3
        listeners   // Array of Objects similar to JW.Observable.Listener */
    
    /* Signature 4
        listeners   // Map from type:String to Object { handler, scope, disposable } or handler:Function, and from "scope" and "disposable" to their default values */
    )
    {
        this.__parseListeners(this.__bind, JW.args(arguments));
    },
    
    /**
     * Remove event listener or all listeners of specified event.
     * Supports many various signatures (see bind method for more info).
     */
    unbind: function(
        type,       // [required] String, event type
        handler,    // [optional] Function, event handler
        scope)      // [optional] Object, if specified, only handlers with this scope will be unbound
    {
        this.__parseListeners(this.__unbind, JW.args(arguments));
    },
    
    /**
     * Remove all event listeners registered for specified scope.
     */
    purge: function(
        scope)  // [required] Object
    {
        if (!this.__observers)
            return;
        
        var observers = this.__observers.get(scope);
        if (!observers)
            return;
        
        for (var i = 0; i < observers.length; ++i)
        {
            var observer = observers[i];
            this.__removeHandler(observer);
        }
        
        this.__observers.del(scope);
    },
    
    /**
     * Remove all event listeners. Used in destructor usually.
     */
    purgeAll: function()
    {
        delete this.__listeners;
        delete this.__observers;
    },
    
    /**
     * Fire event to call all registered event handlers for specified event type.
     */
    trigger: function(
        type        // [required] String, event type
        /* args */) // Additional arguments for event handler call
    {
        this.triggerArray(type, JW.args(arguments, 1));
    },
    
    /**
     * Fire event to call all registered event handlers for specified event type.
     */
    triggerArray: function(
        type,   // [required] String, event type
        args)   // [optional] Array, additional arguments for event handler call
    {
        // Generate event
        this.__triggerEvent(new JW.Event(type, this), args);
    },
    
    /**
     * Relay specified event up from another object.
     * Each event of specified type, triggered by source object, will be
     * triggered by this object as well.
     * Use source.unbind(type) to stop events relaying.
     * Returns handler function.
     */
    relay: function(
        source, // [required] JW.Observable, source object to relay events from
        type)   // [required] String, event type, all events by default
    {
        return source.bind(type, this.__relayHandler, this);
    },
    
    /**
     * Relay specified event up from another object, adding it as first parameter.
     * Each event of specified type, triggered by source object, will be
     * triggered by this object as well.
     * Use source.unbind(type) to stop events relaying.
     * Returns handler function.
     */
    relayChild: function(
        source,   // [required] JW.Observable, source object to relay events from
        fromType, // [required] String, event type to relay
        toType)   // [optional] String, name of redispatched event
    {
        return source.bind(fromType, function(event) {
            this.triggerArray(toType || fromType, [ event.target ].concat(JW.args(arguments).slice(1)));
        }, this);
    },
    
    /**
     * Registers specified events as flags. If user binds a new listener to
     * flag event which has been triggered already, the listener is called
     * immediately. For example, Ajax "load" event should be flag event to
     * avoid "if (loaded)" checking each time on binding.
     *
     * Can be used several times, for example, on Ajax request reloading.
     */
    resetFlagEvents: function(/* eventTypes */)
    {
        this.resetFlagEventsArray(JW.args(arguments));
    },
    
    resetFlagEventsArray: function(eventTypes)
    {
        this.__flags = this.__flags || {};
        for (var i = 0; i < eventTypes.length; ++i)
            this.__flags[eventTypes[i]] = true;
    },
    
    __parseListeners: function(callback, args)
    {
        var main = args[0];
        
        if (!main)
            return;
        
        // Signature 1
        if (typeof main === "string")
            return callback.call(this, main, args[1], args[2], args[3]);
        
        // Signature 2
        if (main.type)
        {
            for (var i = 0; i < args.length; ++i)
                callback.call(this, args[i].type, args[i].handler, args[i].scope, args[i].disposable);
            return;
        }
        
        // Signature 3
        if (JW.isArray(main))
        {
            for (var i = 0; i < main.length; ++i)
                callback.call(this, main[i].type, main[i].handler, main[i].scope, main[i].disposable);
            return;
        }
        
        // Signature 4
        for (var i in main)
        {
            if (i === "scope" || i === "disposable")
                continue;
            
            var value = main[i];
            if (typeof value === "function")
                callback.call(this, i, value, main.scope, main.disposable);
            else
                callback.call(this, i, value.handler, JW.def(value.scope, main.scope), JW.def(value.disposable, main.disposable));
        }
    },
    
    __bind: function(
        type,       // [required] String, event type
        handler,    // [required] Function, event handler
        scope,      // [optional] Object, recommended. If specified, event handler will be called in specified scope. Also the handler will be registered to remove on purge(scope) or unbind (type, handler, scope) call
        disposable) // [optional] Boolean, set to true to auto-unbind the listener as soon as event is triggered first time
    {
        // For flag events and disposable handler, just call it and return
        if (disposable && this.__flags && JW.isArray(this.__flags[type]))
        {
            handler.apply(scope || this, this.__flags[type]);
            return;
        }
        
        // Else register new listener
        var listener = {
            type        : type,
            handler     : handler,
            scope       : scope,
            disposable  : !!disposable
        };
        
        this.__listeners = this.__listeners || {};
        this.__listeners[type] = this.__listeners[type] || [];
        this.__listeners[type].push(listener);
        
        if (scope)
        {
            this.__observers = this.__observers || new JW.Map();
            var observers = this.__observers.get(scope);
            if (observers)
                observers.push(listener);
            else
                this.__observers.set(scope, [ listener ]);
        }
        
        // For flag events and simple handler, call it
        if (this.__flags && JW.isArray(this.__flags[type]))
            handler.apply(scope || this, this.__flags[type]);
    },
    
    __unbind: function(
        type,       // [required] String, event type
        handler,    // [optional] Function, event handler
        scope)      // [optional] Object, if specified, only handlers with this scope will be unbound
    {
        if (!this.__listeners)
            return;
        
        var listeners = this.__listeners[type];
        if (!listeners)
            return;
        
        for (var i = 0; i < listeners.length; ++i)
        {
            var listener = listeners[i];
            if ((!handler || listener.handler === handler) &&
                (!scope   || listener.scope   === scope))
            {
                this.__removeObserver(listener);
                listeners.splice(i, 1);
                --i;
            }
        }
        
        if (listeners.length === 0)
            delete this.__listeners[type];
    },
    
    __removeObserver: function(listener)
    {
        if (!this.__observers)
            return;
        
        var observers = this.__observers.get(listener.scope);
        if (!observers)
            return;
        
        JW.Array.removeItem(observers, listener);
        if (observers.length === 0)
            this.__observers.del(listener.scope);
    },
    
    __removeHandler: function(listener)
    {
        if (!this.__listeners)
            return;
        
        var listeners = this.__listeners[listener.type];
        if (!listeners)
            return;
        
        JW.Array.removeItem(listeners, listener);
        if (listeners.length === 0)
            delete this.__listeners[listener.type];
    },
    
    __relayHandler: function(event)
    {
        this.triggerArray(event.type, JW.args(arguments).slice(1));
    },
    
    __triggerEvent: function(event, args)
    {
        var type = event.type;
        var handlerArgs = [ event ].concat(args);
        
        // Store flag event arguments
        if (this.__flags && this.__flags[type])
            this.__flags[type] = handlerArgs;
        
        // Retrieve listeners list
        if (!this.__listeners)
            return;
        
        var listeners = this.__listeners[type];
        if (!listeners)
            return;
        
        var triggers = listeners.concat();
        
        // Unbind disposable listeners
        for (var i = 0; i < listeners.length; ++i)
        {
            var listener = listeners[i];
            if (listener.disposable)
            {
                this.__removeObserver(listener);
                listeners.splice(i, 1);
                --i;
            }
        }
        
        if (listeners.length === 0)
            delete this.__listeners[type];
        
        // Trigger event
        for (var i = 0; i < triggers.length; ++i)
        {
            var listener = triggers[i];
            listener.handler.apply(listener.scope || this, handlerArgs);
        }
    }
});

// Prototype
JW.Observable.Listener = {
    type        : null, // String
    handler     : null, // Function
    scope       : null, // Object
    disposable  : null  // Boolean
};

/*
    JW config object.
    
    Copyright (C) 2012 Egor Nepomnyaschih
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    
    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.Config = JW.Class.extend({
    init: function(config)
    {
        this._super();
        JW.apply(this, config);
    }
});

/*
    JW observable config object.
    
    Copyright (C) 2012 Egor Nepomnyaschih
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    
    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.ObservableConfig = JW.Observable.extend({
    init: function(config)
    {
        this._super();
        JW.apply(this, config);
    }
});

/*
    JW simple collection methods.
    
    Copyright (C) 2012 Egor Nepomnyaschih
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    
    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.ns("JW.Alg");

JW.apply(JW, {
    /**
     * Executes a function on each item in a collection, and returns true if
     * all items have returned value true.
     */
    every: function(
        target,     // [required] Mixed
        callback,   // [required] Function(item, /* keys */)
        scope)      // [optional] Object
    {
        if (typeof target === "function")
            return target(callback, scope || JW.global);
        
        if (typeof target !== "object" || !target)
            return true;
        
        if (typeof target.every === "function")
            return target.every(callback, scope);
        
        if (JW.isArray(target))
            return JW.Array.every(target, callback, scope);
        
        for (var i in target)
        {
            if (!callback.call(scope || target, target[i], i))
                return false;
        }
        
        return true;
    },
    
    /**
     * Returns true if all items' specified field value is equal (==)
     * to specified one. Must contain objects only.
     */
    everyBy: function(
        target,     // [required] Mixed
        field,      // [required] String
        value)      // [required] *
    {
        return JW.invokeBy(JW.every, target, field, value);
    },
    
    /**
     * Returns true if all items' specified method result is true.
     * Must contain objects only.
     */
    everyByMethod: function(
        target,     // [required] Mixed
        method,     // [required] String
        args)       // [optional] Array of arguments to pass into method
    {
        return JW.invokeByMethod(JW.every, target, method, args);
    },
    
    /**
     * Executes a function on each item in a collection.
     */
    each: function(
        target,     // [required] Mixed
        callback,   // [required] Function(item, /* keys */)
        scope)      // [optional] Object
    {
        JW.every(target, JW.Function.returns(callback, true), scope);
        return target;
    },
    
    /**
     * Executes a method of each item in collection. Must contain objects only.
     */
    eachByMethod: function(
        target,     // [required] Mixed
        method,     // [required] String
        args)       // [optional] Array of arguments to pass into method
    {
        return JW.invokeByMethod(JW.each, target, method, args);
    },
    
    /**
     * Executes a function on each item in a collection, and returns true if
     * at least one item has returned value true.
     */
    some: function(
        target,     // [required] Mixed
        callback,   // [required] Function(item, /* keys */)
        scope)      // [optional] Object
    {
        return !JW.every(target, JW.Function.not(callback), scope);
    },
    
    /**
     * Returns true if some items' specified field value is equal (==)
     * to specified one. Must contain objects only.
     */
    someBy: function(
        target,     // [required] Mixed
        field,      // [required] String
        value)      // [required] *
    {
        return JW.invokeBy(JW.some, target, field, value);
    },
    
    /**
     * Returns true if all items' specified method result is true.
     * Must contain objects only.
     */
    someByMethod: function(
        target,     // [required] Mixed
        method,     // [required] String
        args)       // [optional] Array of arguments to pass into method
    {
        return JW.invokeByMethod(JW.some, target, method, args);
    },
    
    /**
     * Find first item index where callback returns true.
     */
    find: function(
        target,     // [required] Mixed
        callback,   // [required] Function(item, /* keys */)
        scope)      // [optional] Object
    {
        var result;
        JW.every(target, function(item, index) {
            if (callback.apply(scope || this, arguments))
            {
                result = index;
                return false;
            }
            
            return true;
        });
        
        return result;
    },
    
    /**
     * Find first item index where specified field equals to specified value.
     */
    findBy: function(
        target,     // [required] Mixed
        field,      // [required] String
        value)      // [required] *
    {
        return JW.invokeBy(JW.find, target, field, value);
    },
    
    /**
     * Find first item index where specified method returns true.
     */
    findByMethod: function(
        target,     // [required] Mixed
        method,     // [required] String
        args)       // [optional] Array of arguments to pass into method
    {
        return JW.invokeByMethod(JW.find, target, method, args);
    },
    
    /**
     * Find first item where callback returns true.
     */
    search: function(
        target,     // [required] Mixed
        callback,   // [required] Function(item, /* keys */)
        scope)      // [optional] Object
    {
        var result;
        JW.every(target, function(item) {
            if (callback.apply(scope || this, arguments))
            {
                result = item;
                return false;
            }
            
            return true;
        });
        
        return result;
    },
    
    /**
     * Find first item where specified field equals to specified value.
     */
    searchBy: function(
        target,     // [required] Mixed
        field,      // [required] String
        value)      // [required] *
    {
        return JW.invokeBy(JW.search, target, field, value);
    },
    
    /**
     * Find first item where specified method returns true.
     */
    searchByMethod: function(
        target,     // [required] Mixed
        method,     // [required] String
        args)       // [optional] Array of arguments to pass into method
    {
        return JW.invokeByMethod(JW.search, target, method, args);
    },
    
    /**
     * Run specified algorithm with field value comparison callback.
     */
    invokeBy: function(
        algorithm,  // [required] Function(target, callback)
        target,     // [required] Mixed
        field,      // [required] String
        value)      // [required] *
    {
        return algorithm(target, function(item) {
            return JW.get(item, field) == value;
        });
    },
    
    /**
     * Run specified algorithm with method invokation callback.
     */
    invokeByMethod: function(
        algorithm,  // [required] Function(target, callback)
        target,     // [required] Mixed
        method,     // [required] String
        args)       // [optional] Array of arguments to pass into method
    {
        args = args || [];
        return algorithm(target, function(item) {
            return item[method].apply(item, args);
        });
    },
    
    /**
     * Builds array of all values in a collection.
     */
    getValuesArray: function(
        target)     // [required] Mixed
    {
        var result = [];
        JW.every(target, function(item) {
            result.push(item);
            return true;
        });
        return result;
    },
    
    /**
     * Builds set of all values in a collection (object from items to true).
     */
    getValuesSet: function(
        target)     // [required] Mixed
    {
        var result = {};
        JW.every(target, function(item) {
            result[item] = true;
            return true;
        });
        return result;
    },
    
    /**
     * Iterates collection and returns its length.
     */
    getLength: function(
        target)     // [required] Mixed
    {
        var result = 0;
        JW.every(target, function(item) {
            ++result;
            return true;
        });
        return result;
    },
    
    /**
     * Returns true if collection doesn't contain any items.
     */
    isEmpty: function(
        target)     // [required] Mixed
    {
        return JW.every(target, function(item) {
            return false;
        });
    },
    
    /**
     * Indexes items by specified field.
     */
    indexBy: function( // Object
        target, // [required] Mixed
        field)  // [required] String, field name
    {
        var result = {};
        JW.every(target, function(item) {
            var key = JW.get(item, field);
            if (JW.isSet(key))
                result[key] = item;
            return true;
        });
        return result;
    }
});

JW.forEach = JW.each;
JW.forEachByMethod = JW.eachByMethod;

/**
 * Add these methods to prototype of your simple collection.
 */
JW.Alg.SimpleMethods = {
    everyBy: function(field, value)
    {
        return JW.everyBy(this, field, value);
    },
    
    everyByMethod: function(method, args)
    {
        return JW.everyByMethod(this, method, args);
    },
    
    each: function(callback, scope)
    {
        return JW.each(this, callback, scope);
    },
    
    eachByMethod: function(method, args)
    {
        return JW.eachByMethod(this, method, args);
    },
    
    forEach: function(callback, scope)
    {
        return JW.forEach(this, callback, scope);
    },
    
    forEachByMethod: function(method, args)
    {
        return JW.forEachByMethod(this, method, args);
    },
    
    some: function(callback, scope)
    {
        return JW.some(this, callback, scope);
    },
    
    someBy: function(field, value)
    {
        return JW.someBy(this, field, value);
    },
    
    someByMethod: function(method, args)
    {
        return JW.someByMethod(this, method, args);
    },
    
    find: function(callback, scope)
    {
        return JW.find(this, callback, scope);
    },
    
    findBy: function(field, value)
    {
        return JW.findBy(this, field, value);
    },
    
    findByMethod: function(method, args)
    {
        return JW.findByMethod(this, method, args);
    },
    
    search: function(callback, scope)
    {
        return JW.search(this, callback, scope);
    },
    
    searchBy: function(field, value)
    {
        return JW.searchBy(this, field, value);
    },
    
    searchByMethod: function(method, args)
    {
        return JW.searchByMethod(this, method, args);
    },
    
    invokeBy: function(algorithm, field, value)
    {
        return JW.invokeBy(algorithm, this, field, value);
    },
    
    invokeByMethod: function(algorithm, method, args)
    {
        return JW.invokeByMethod(algorithm, this, method, args);
    },
    
    getValuesArray: function()
    {
        return JW.getValuesArray(this);
    },
    
    getValuesSet: function()
    {
        return JW.getValuesSet(this);
    },
    
    getLength: function()
    {
        return JW.getLength(this);
    },
    
    isEmpty: function()
    {
        return JW.isEmpty(this);
    },
    
    indexBy: function(field)
    {
        return JW.indexBy(this, field);
    }
};

/*
    JW collection building methods.
    
    Copyright (C) 2012 Egor Nepomnyaschih
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    
    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.ns("JW.Alg");

JW.apply(JW, {
    /**
     * Creates a collection of the same type as target, which does not contain
     * any items.
     */
    createEmpty: function(
        target)     // [required] Mixed
    {
        if (typeof target === "function")
            return target();
        
        if (!target || typeof target !== "object")
            return null;
        
        if (typeof target.createEmpty === "function")
            return target.createEmpty();
        
        return JW.isArray(target) ? [] : {};
    },
    
    /**
     * Updates item value in target collection.
     * Returns updated collection.
     */
    pushItem: function(
        target,     // [required] Mixed
        params)     // [required] Arguments of "every" method
    {
        if (typeof target === "function")
            return target.apply(JW.global, params);
        
        if (!target || typeof target !== "object")
            return target;
        
        if (typeof target.pushItem === "function")
            return target.pushItem.apply(target, params);
        
        if (JW.isArray(target))
            return target.push(params[0]);
        
        target[params[1]] = params[0];
        return target;
    },
    
    /**
     * Constructs a new collection containing the same items that original
     * collection contains (clone copy).
     */
    clone: function(
        target)     // [required] Mixed
    {
        var result = JW.createEmpty(target);
        return JW.merge(result, target);
    },
    
    /**
     * Executes a function on each item in a collection, and constructs a new
     * collection of items in original collection which have returned true
     * value.
     */
    filter: function(
        target,     // [required] Mixed
        callback,   // [required] Function(item, /* keys */)
        scope)      // [optional] Object
    {
        var result = JW.createEmpty(target);
        JW.every(target, function() {
            if (callback.apply(scope || this, arguments))
                JW.pushItem(result, arguments);
            return true;
        });
        return result;
    },
    
    /**
     * Finds all item objects which contain field with value equal (==) to specified one
     * and builds new collection of such items.
     * This collection must contain objects only.
     */
    filterBy: function(
        target,     // [required] Mixed
        field,      // [required] String, field name
        value)      // [required] *
    {
        return JW.filter(target, function(item) {
            return JW.get(item, field) == value;
        });
    },
    
    /**
     * Finds all item objects which contain method returning result is true
     * and builds new collection of such items.
     * This collection must contain objects only.
     */
    filterByMethod: function (
        target,     // [required] Mixed
        method,     // [required] String
        args)       // [optional] Array of arguments to pass into method
    {
        args = args || [];
        return JW.filter(target, function(item) {
            return item[method].apply(item, args);
        });
    },
    
    /**
     * Executes a function on each item in a collection, and constructs a new collection
     * of items corresponding to the results of the function on each item in the
     * original collection.
     */
    map: function(
        target,     // [required] Mixed
        callback,   // [required] Function(item, /* keys */)
        scope)      // [optional] Object
    {
        var result = JW.createEmpty(target);
        JW.every(target, function() {
            var args = JW.args(arguments);
            args[0] = callback.apply(scope || this, arguments);
            JW.pushItem(result, args);
            return true;
        });
        return result;
    },
    
    /**
     * Constructs a new collection of values of specified field of each item.
     */
    mapBy: function(
        target,     // [required] Mixed
        field)      // [required] String, field name
    {
        return JW.map(target, function(item) {
            return JW.get(item, field);
        });
    },
    
    /**
     * Constructs a new collection of results of specified method of each item.
     */
    mapByMethod: function(
        target,     // [required] Mixed
        method,     // [required] String
        args)       // [optional] Array of arguments to pass into method
    {
        args = args || [];
        return JW.map(target, function(item) {
            return item[method].apply(item, args);
        });
    },
    
    /**
     * Builds an object which contains collections of corresponding fields of each item.
     */
    mapFields: function(
        target)     // [required] Mixed
    {
        var result = {};
        JW.every(target, function(item) {
            for (var key in item)
                result[key] = JW.mapBy(target, key);
            
            // Exit immediately
            return false;
        });
        return result;
    },
    
    /**
     * Merged items from source collection into target collection.
     * Returns target collection.
     */
    merge: function(
        target,     // [required] Mixed
        source)     // [required] Mixed
    {
        JW.every(source, function() {
            JW.pushItem(target, arguments);
            return true;
        });
        return target;
    }
});

/**
 * Add these methods to prototype of your building collection.
 */
JW.Alg.BuildMethods = {
    clone: function()
    {
        return JW.clone(this);
    },
    
    filter: function(callback, scope)
    {
        return JW.filter(this, callback, scope);
    },
    
    filterBy: function(field, value)
    {
        return JW.filterBy(this, field, value);
    },
    
    filterByMethod: function(method, args)
    {
        return JW.filterByMethod(this, method, args);
    },
    
    map: function(callback, scope)
    {
        return JW.map(this, callback, scope);
    },
    
    mapBy: function(field)
    {
        return JW.mapBy(this, field);
    },
    
    mapByMethod: function(method, args)
    {
        return JW.mapByMethod(this, method, args);
    },
    
    mapFields: function()
    {
        return JW.mapFields(this);
    },
    
    merge: function(source)
    {
        return JW.merge(this, source);
    }
};

/*
    JW array extension.
    
    Copyright (C) 2012 Egor Nepomnyaschih
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    
    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.Array = JW.Class.extend({
    base : null, // [readonly] Array
    
    init: function(x)
    {
        this.base = x;
    }
});

JW.Array._prototype = {
    /**
     * Executes a function on each item in an array, and returns true if
     * all items have returned value true.
     */
    every: function( // Boolean
        callback, // [required] Function(item, index, array)
        scope)    // [optional] Object
    {
        for (var i = 0; i < this.length; ++i)
        {
            if (!callback.call(scope || this, this[i], i))
                return false;
        }
        
        return true;
    },
    
    /**
     * Creates empty array. JW.Alg.BuildMethods-required method.
     */
    createEmpty: function() // Array
    {
        return [];
    },
    
    /**
     * Adds an item to array. Returns updated array. JW.Alg.BuildMethods-required method.
     */
    pushItem: function( // this
        value, // [required] *
        index) // [optional] Integer
    {
        this.push(value);
        return this;
    },
    
    /**
     * Finds item object which contains field with value equal (==) to specified one
     * and removes all such items.
     * This array must contain objects only.
     */
    removeBy: function( // this
        field, // [required] String, field name
        value) // [required] *
    {
        var index = 0;
        while (index < this.length)
        {
            if (JW.get(this[index], field) == value)
                this.splice(index, 1);
            else
                ++index;
        }
        
        return this;
    },
    
    /**
     * Removes all items equal (==) to specified value.
     */
    removeItem: function( // this
        item) // [optional] *
    {
        for (var i = 0; i < this.length; ++i)
        {
            if (this[i] == item)
            {
                this.splice(i, 1);
                --i;
            }
        }
        
        return this;
    },
    
    /**
     * Compares two arrays by items respectively (==).
     */
    equal: function( // Boolean
        arr) // [required] Array
    {
        if (this === arr)
            return true;
        
        if (this.length != arr.length)
            return false;
        
        for (var i = 0; i < this.length; ++i)
        {
            if (this[i] != arr[i])
                return false;
        }
        
        return true;
    },
    
    /**
     * Adds multiple items to array.
     */
    pushAll: function( // this
        items) // [optional] Array
    {
        if (!items)
            return this;
        
        this.push.apply(this, items);
        return this;
    },
    
    /**
     * Sorts array using value of specified item field for comparing the items.
     * This array must contain objects only.
     */
    sortBy: function( // this
        field, // [optional] String
        order) // [optional] Number
    {
        order = order || 1;
        this.sort(function(x, y) {
            return JW.cmp(JW.get(x, field), JW.get(y, field)) * order;
        });
        return this;
    },
    
    /**
     * Returns last element of array.
     */
    top: function() // *
    {
        return this[this.length - 1];
    },
    
    /**
     * Considering all items of this array as arrays, builds new array
     * containing all items of child arrays. Supports arbitrary collapsing
     * depth. If depth is undefined, collapses all levels.
     */
    collapse: function( // Array
        depth) // [optional] Integer
    {
        var result = [];
        for (var i = 0; i < this.length; ++i)
        {
            if (!JW.isArray(this[i]))
            {
                result.push(this[i]);
                continue;
            }
            
            if (!JW.isSet(depth))
            {
                JW.Array.pushAll(result, JW.Array.collapse(this[i]));
                continue;
            }
            
            if (depth)
            {
                JW.Array.pushAll(result, JW.Array.collapse(this[i], depth - 1));
                continue;
            }
            
            result.push(this[i]);
        }
        
        return result;
    },
    
    /**
     * Find specified item.
     */
    indexOf: Array.prototype.indexOf || function( // Integer
        item) // [optional] *
    {
        for (var i = 0; i < this.length; ++i)
        {
            if (this[i] == item)
                return i;
        }
        
        return -1;
    },
    
    /**
     * Insert item (JW.Syncher-compatible).
     */
    insertItemAt: function( // this
        item,  // [required] *
        index) // [required] Integer
    {
        if (JW.isSet(index))
            this.splice(index, 0, item);
        else
            this.push(item);
        
        return this;
    },
    
    /**
     * Remove item (JW.Syncher-compatible).
     */
    removeItemAt: function( // *
        index)  // [required] Integer
    {
        var item = this[index];
        this.splice(index, 1);
        return item;
    },
    
    /**
     * Clear items (JW.Syncher-compatible).
     */
    clearItems: function() // this
    {
        this.splice(0, this.length);
        return this;
    },
    
    /**
     * Get array length. JW.Alg.SimpleMethods-overriding method.
     */
    getLength: function()
    {
        return this.length;
    },
    
    /**
     * Check if array is empty.
     */
    isEmpty: function()
    {
        return this.length === 0;
    }
};

JW.applyIf(JW.Array._prototype, JW.Alg.SimpleMethods, JW.Alg.BuildMethods);

JW.extendFly(JW.Array, JW.Array._prototype, {
    concat      : Array.prototype.concat,
    join        : Array.prototype.join,
    lastIndexOf : Array.prototype.lastIndexOf,
    pop         : Array.prototype.pop,
    push        : Array.prototype.push,
    reverse     : Array.prototype.reverse,
    shift       : Array.prototype.shift,
    slice       : Array.prototype.slice,
    sort        : Array.prototype.sort,
    splice      : Array.prototype.splice,
    toString    : Array.prototype.toString,
    unshift     : Array.prototype.unshift,
    valueOf     : Array.prototype.valueOf
});

JW.apply(JW.Array, {
    every            : JW.descope(JW.Array._prototype.every),
    removeBy         : JW.descope(JW.Array._prototype.removeBy),
    removeItem       : JW.descope(JW.Array._prototype.removeItem),
    equal            : JW.descope(JW.Array._prototype.equal),
    pushAll          : JW.descope(JW.Array._prototype.pushAll),
    sortBy           : JW.descope(JW.Array._prototype.sortBy),
    top              : JW.descope(JW.Array._prototype.top),
    collapse         : JW.descope(JW.Array._prototype.collapse),
    indexOf          : JW.descope(JW.Array._prototype.indexOf),
    insertItemAt     : JW.descope(JW.Array._prototype.insertItemAt),
    removeItemAt     : JW.descope(JW.Array._prototype.removeItemAt),
    clearItems       : JW.descope(JW.Array._prototype.clearItems),
    getLength        : JW.descope(JW.Array._prototype.getLength),
    isEmpty          : JW.descope(JW.Array._prototype.isEmpty),
    
    /**
     * Arrays comparison function.
     */
    cmp: function( // Integer
        x,               // [required] Array
        y,               // [required] Array
        caseInsensitive) // [optional] Boolean
    {
        var n = Math.min(x.length, y.length);
        for (var i = 0; i < n; ++i)
        {
            var result = JW.cmp(x[i], y[i], caseInsensitive);
            if (result)
                return result;
        }
        
        return JW.cmp(x.length, y.length);
    },
    
    /**
     * Returns shuffled array of numbers from 0 to n-1.
     */
    shuffle: function( // Array
        n) // [required] Integer
    {
        var result = new Array(n);
        for (var i = 0; i < n; ++i)
            result[i] = i;
        
        for (var i = 0; i < n; ++i)
        {
            var j = i + Math.floor(Math.random() * (n - i));
            var t = result[i];
            result[i] = result[j];
            result[j] = t;
        }
        
        return result;
    }
});

/*
    JW function prototype extension.
    
    Copyright (C) 2012 Egor Nepomnyaschih
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    
    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.Function = JW.Class.extend({
    base : null, // [readonly] Function
    
    init: function(x)
    {
        this.base = x;
    }
});

JW.Function._prototype = {
    /**
     * Returns callback with specified scope.
     */
    inScope: function( // Function
        scope) // [optional] Object
    {
        var callee = this;
        return function() {
            return callee.apply(scope || this, arguments);
        }
    },
    
    /**
     * Returns callback with empty arguments list.
     */
    noArgs: function() // Function
    {
        var callee = this;
        return function() {
            return callee.call(this);
        }
    },
    
    /**
     * Returns callback with specified arguments inserted.
     */
    insertArgs: function( // Function
        index        // [required] Integer
        /*, args */) // [optional] *
    {
        return JW.Function.insertArgsArray(this, index, JW.args(arguments, 1));
    },
    
    /**
     * Returns callback with specified arguments inserted.
     */
    insertArgsArray: function( // Function
        index,  // [required] Integer
        args)   // [optional] Array
    {
        var callee = this;
        return function() {
            var args_new = JW.args(arguments);
            while (args_new.length < index)
                args_new.push(undefined);
            args_new.splice.apply(args_new, [ index, 0 ].concat(args));
            return callee.apply(this, args_new);
        }
    },
    
    /**
     * Returns callback with specified arguments removed.
     */
    removeArgs: function( // Function
        index,  // [required] Integer
        count)  // [optional] Integer
    {
        var callee = this;
        return function() {
            if (arguments.length <= index)
                return callee.apply(this, arguments);
            
            var args_new = JW.args(arguments);
            count = JW.defn(count, args_new.length - index);
            args_new.splice(index, count);
            return callee.apply(this, args_new);
        }
    },
    
    /**
     * Returns callback with specified arguments.
     * Pass "\x" to insert original argument with x index (x = 0..7).
     */
    withArgs: function( // Function
        /* args */) // [optional] *
    {
        return JW.Function.asArray(this, null, JW.args(arguments));
    },
    
    /**
     * Returns callback with specified arguments.
     * Pass "\x" to insert original argument with x index (x = 0..7).
     */
    withArgsArray: function( // Function
        args) // [required] Array
    {
        return JW.Function.asArray(this, null, args);
    },
    
    /**
     * Universal callback builder.
     * Optimized combination of inScope and withArgs methods.
     */
    as: function( // Function
        scope        // [optional] Object
        /*, args */) // [optional] *
    {
        return JW.Function.asArray(this, scope, JW.args(arguments, 1));
    },
    
    /**
     * Universal callback builder.
     * Optimized combination of inScope and withArgs methods.
     */
    asArray: function( // Function
        scope, // [optional] Object
        args)  // [required] Array
    {
        var callee = this;
        return function() {
            var args_new = [];
            for (var i = 0; i < args.length; ++i)
            {
                var a = args[i];
                if (typeof a === "string" && a.length == 1 && (a.charCodeAt(0) < 8))
                    args_new.push(arguments[a.charCodeAt(0)]);
                else
                    args_new.push(a);
            }
            return callee.apply(scope || this, args_new);
        }
    },
    
    /**
     * Returns callback which returns opposite boolean value.
     */
    not: function() // Function
    {
        var callee = this;
        return function() {
            return !callee.apply(this, arguments);
        }
    }
};

JW.apply(JW.Function, {
    enscope         : JW.enscope,
    descope         : JW.descope,
    
    inScope         : JW.descope(JW.Function._prototype.inScope),
    noArgs          : JW.descope(JW.Function._prototype.noArgs),
    insertArgs      : JW.descope(JW.Function._prototype.insertArgs),
    insertArgsArray : JW.descope(JW.Function._prototype.insertArgsArray),
    removeArgs      : JW.descope(JW.Function._prototype.removeArgs),
    withArgs        : JW.descope(JW.Function._prototype.withArgs),
    withArgsArray   : JW.descope(JW.Function._prototype.withArgsArray),
    as              : JW.descope(JW.Function._prototype.as),
    asArray         : JW.descope(JW.Function._prototype.asArray),
    not             : JW.descope(JW.Function._prototype.not),
    
    /**
     * Returns callback which returns conjunction of several function results.
     */
    and: function( // Function
        /* callbacks */) // [optional] Function
    {
        var callbacks = JW.args(arguments);
        return function() {
            for (var i = 0; i < callbacks.length; ++i)
            {
                if (!callbacks[i].apply(this, arguments))
                    return false;
            }
            return true;
        }
    },

    /**
     * Returns callback which returns disjunction of several function results.
     */
    or: function( // Function
        /* callbacks */) // [optional] Function
    {
        var callbacks = JW.args(arguments);
        return function() {
            for (var i = 0; i < callbacks.length; ++i)
            {
                if (callbacks[i].apply(this, arguments))
                    return true;
            }
            return false;
        }
    },

    /**
     * Returns callback which returns boolean sum of several function results.
     */
    xor: function( // Function
        /* callbacks */) // [optional] Function
    {
        var callbacks = JW.args(arguments);
        return function() {
            var result = 0;
            for (var i = 0; i < callbacks.length; ++i)
                result = result ^ callbacks[i].apply(this, arguments);
            return result;
        }
    },

    /**
     * Returns callback which returns implication of 2 function results.
     */
    impl: function( // Function
        x, // [required] Function
        y) // [required] Function
    {
        return function() {
            return !x.apply(this, arguments) || y.apply(this, arguments);
        }
    },
    
    /**
     * Returns callback which runs multiple functions and returns result of last function.
     */
    forth: function( // Function
        /* callbacks */) // [required] Function
    {
        var callbacks = JW.args(arguments);
        return function() {
            for (var i = 0; i < callbacks.length - 1; ++i)
                callbacks[i].apply(this, arguments);
            return JW.Array.top(callbacks).apply(this, arguments);
        }
    },
    
    /**
     * Returns callback which runs multiple functions and returns result of first function.
     */
    back: function( // Function
        /* callbacks */) // [required] Function
    {
        var callbacks = JW.args(arguments);
        return function() {
            var result = callbacks[0].apply(this, arguments);
            for (var i = 1; i < callbacks.length; ++i)
                callbacks[i].apply(this, arguments);
            return result;
        }
    },
    
    /**
     * Returns callback which runs function and returns specified value.
     */
    returns: function( // Function
        target, // [optional] Function
        value)  // [required] *
    {
        if (target)
        {
            return function() {
                target.apply(this, arguments);
                return value;
            }
        }
        else
        {
            return function() {
                return value;
            }
        }
    },
    
    /**
     * Returns callback which runs function and returns specified argument.
     */
    returnsArg: function( // Function
        target, // [optional] Function
        index)  // [required] Integer
    {
        if (target)
        {
            return function() {
                target.apply(this, arguments);
                return arguments[index];
            }
        }
        else
        {
            return function() {
                return arguments[index];
            }
        }
    }
});

JW.apply(JW.Function._prototype, {
    enscope    : JW.enscope(JW.enscope),
    descope    : JW.enscope(JW.descope),
    
    and        : JW.enscope(JW.Function.and),
    or         : JW.enscope(JW.Function.or),
    xor        : JW.enscope(JW.Function.xor),
    impl       : JW.enscope(JW.Function.impl),
    forth      : JW.enscope(JW.Function.forth),
    back       : JW.enscope(JW.Function.back),
    returns    : JW.enscope(JW.Function.returns),
    returnsArg : JW.enscope(JW.Function.returnsArg)
});

JW.extendFly(JW.Function, JW.Function._prototype, {
    call  : Array.prototype.call,
    apply : Array.prototype.apply
});

/*
    JW string prototype extension.
    
    Copyright (C) 2012 Egor Nepomnyaschih
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    
    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.String = JW.Class.extend({
    base : null, // [readonly] String
    
    init: function(x)
    {
        this.base = x;
    }
});

JW.String._prototype = {
    /**
     * Replaces all special characters from text to put it into html properly.
     */
    htmlEncode: function() // String
    {
        return this.
            replace(/&/g, "&amp;").
            replace(/>/g, "&gt;").
            replace(/</g, "&lt;").
            replace(/"/g, "&quot;");
    },
    
    /**
     * Back function to htmlEncode.
     */
    htmlDecode: function() // String
    {
        return this.
            replace(/&quot;/g, '"').
            replace(/&lt;/g, "<").
            replace(/&gt;/g, ">").
            replace(/&amp;/g, "&");
    },
    
    /**
     * Removes all <script> tags from html to prevent scripting.
     */
    removeScripts: function() // String
    {
        var result = [];
        var index = 0;
        while (true)
        {
            var from = this.indexOf("<script", index);
            if (from == -1)
                break;
            
            result.push(this.substr(index, from - index));
            index = this.indexOf("</script>", from) + 9;
            
            if (index == -1)
                return result.join("");
        }
        
        result.push(this.substr(index));
        return result.join("");
    },
    
    /**
     * Shortens string to specified length using ellipsis.
     */
    ellipsis: function( // String
        length,   // [required] Integer, string length to shorten to
        ellipsis) // [optional] String, defaults to "..."
    {
        if (this.length <= length)
            return this;
        
        ellipsis = ellipsis || "...";
        return this.substr(0, length - ellipsis.length) + ellipsis;
    },
    
    /**
     * Prepends string by specified symbols till specified length.
     */
    prepend: function( // String
        length, // [required] Integer, string length to stretch to
        ch)     // [required] String, symbol to prepend
    {
        var buf = [];
        length -= this.length;
        for (var i = 0; i < length; ++i)
            buf.push(ch);
        buf.push(this);
        return buf.join("");
    },
    
    /**
     * Takes first symbol in string to upper case.
     */
    capitalize: function() // String
    {
        return this.charAt(0).toUpperCase() + this.substr(1);
    },
    
    /**
     * Converts all hyphen/lowercase pairs to uppercase symbols.
     */
    camel: function() // String
    {
        return this.replace(/-([a-z])/ig, JW.String._fcamel);
    },
    
    /**
     * Converts all uppercase letters to hyphen/lowercase pairs.
     */
    hyphen: function() // String
    {
        return this.replace(/([A-Z])/g, JW.String._fhyphen);
    },
    
    /**
     * Removes all whitespaces at the beginning and at the end.
     */
    trim: function() // String
    {
        return this.replace(/^\s*/, "").replace(/\s*$/, "");
    }
};

JW.extendFly(JW.String, JW.String._prototype, {
    charAt       : String.prototype.charAt,
    charCodeAt   : String.prototype.charCodeAt,
    concat       : String.prototype.concat,
    indexOf      : String.prototype.indexOf,
    lastIndexOf  : String.prototype.lastIndexOf,
    match        : String.prototype.match,
    replace      : String.prototype.replace,
    search       : String.prototype.search,
    slice        : String.prototype.slice,
    split        : String.prototype.split,
    substr       : String.prototype.substr,
    substring    : String.prototype.substring,
    toLowerCase  : String.prototype.toLowerCase,
    toUpperCase  : String.prototype.toUpperCase,
    valueOf      : String.prototype.valueOf
});

JW.apply(JW.String, {
    htmlEncode    : JW.descope(JW.String._prototype.htmlEncode,    String),
    htmlDecode    : JW.descope(JW.String._prototype.htmlDecode,    String),
    removeScripts : JW.descope(JW.String._prototype.removeScripts, String),
    ellipsis      : JW.descope(JW.String._prototype.ellipsis,      String),
    prepend       : JW.descope(JW.String._prototype.prepend,       String),
    capitalize    : JW.descope(JW.String._prototype.capitalize,    String),
    camel         : JW.descope(JW.String._prototype.camel,         String),
    hyphen        : JW.descope(JW.String._prototype.hyphen,        String),
    trim          : JW.descope(JW.String._prototype.trim,          String),
    
    _fcamel: function(a, b)
    {
        return b.toUpperCase();
    },
    
    _fhyphen: function(a, b)
    {
        return "-" + b.toLowerCase();
    }
});

/*
    JW ordered collection.
    
    Copyright (C) 2012 Egor Nepomnyaschih
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    
    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    
    ----
    
    This is an adapter of array that triggers events about modifications.
    Events are taken from ActionScript's CollectionEventKind (with small
    reasonable changes).
*/

JW.Collection = JW.Observable.extend({
    // Events:
    // add(event:JW.Event, index:Integer, item:*)
    // remove(event:JW.Event, index:Integer, item:*)
    // replace(event:JW.Event, index:Integer, oldItem:*, newItem:*)
    // move(event:JW.Event, fromIndex:Integer, toIndex:Integer, item:*)
    // clear(event:JW.Event)
    // reorder(event:JW.Event)
    // filter(event:JW.Event)
    // reset(event:JW.Event)
    
    base: null, // [readonly] Array
    
    init: function(
        base)   // [optional] Array
    {
        this._super();
        this.base = JW.map(JW.makeArray(base), this._createItem, this);
    },
    
    destroy: function()
    {
        this.each(this._destroyItem, this);
        this._super();
    },
    
    getLength: function()
    {
        return this.base.length;
    },
    
    isEmpty: function()
    {
        return this.base.length === 0;
    },
    
    getItemAt: function(index)
    {
        return this.base[index];
    },
    
    addItem: function( // *
        item)   // [required] *
    {
        return this.addItemAt(item, this.getLength());
    },
    
    addItemAt: function( // *
        item,   // [required] *
        index)  // [required] Integer
    {
        item = this._createItem(item);
        this.base.splice(index, 0, item);
        this.trigger("add", index, item);
        return item;
    },
    
    removeItem: function( // *
        item)   // [required] *
    {
        var index = JW.Array.indexOf(this.base, item);
        if (index != -1)
            return this.removeItemAt(index);
        
        return null;
    },
    
    removeItemAt: function( // *
        index)  // [required] Integer
    {
        var item = this.base[index];
        this.base.splice(index, 1);
        this.trigger("remove", index, item);
        this._destroyItem(item);
        return item;
    },
    
    setItem: function( // *
        index,  // [required] Integer
        item)   // [required] *
    {
        var oldItem = this.base[index];
        item = this._createItem(item);
        this.base[index] = item;
        this.trigger("replace", index, oldItem, item);
        this._destroyItem(oldItem);
        return item;
    },
    
    moveItem: function( // *
        fromIndex,  // [required] Integer
        toIndex)    // [required] Integer
    {
        var item = this.base[fromIndex];
        this.base.splice(fromIndex, 1);
        this.base.splice(toIndex, 0, item);
        this.trigger("move", fromIndex, toIndex, item);
        return item;
    },
    
    clear: function()
    {
        this.each(this._destroyItem, this);
        this.base.splice(0, this.base.length);
        this.trigger("clear");
    },
    
    triggerReorder: function()
    {
        this.trigger("reorder");
    },
    
    triggerFilter: function()
    {
        this.trigger("filter");
    },
    
    triggerReset: function()
    {
        this.trigger("reset");
    },
    
    every: function(
        callback,   // [required] Function(item, index, array)
        scope)      // [optional] Object
    {
        return JW.every(this.base, callback, scope);
    },
    
    createEmpty: function()
    {
        return new JW.Collection();
    },
    
    pushItem: function(value, index)
    {
        this.base.push(value);
        return this;
    },
    
    _createItem: function(data)
    {
        return data;
    },
    
    _destroyItem: function(item)
    {
    }
});

JW.applyIf(JW.Collection.prototype, JW.Alg.SimpleMethods);
JW.applyIf(JW.Collection.prototype, JW.Alg.BuildMethods);

/*
    JW factory logic.
    
    Copyright (C) 2012 Egor Nepomnyaschih
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    
    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.makeFactory = function(cls, idField)
{
    idField = idField || "id";
    
    JW.apply(cls, {
        items: {},
        
        registerItem: function(item)
        {
            cls.items[item[idField]] = item;
        },
        
        getItem: function(value)
        {
            return (value instanceof cls) ? value : cls.items[value];
        },
        
        getId: function(value)
        {
            return (value instanceof cls) ? value[idField] : value;
        }
    });
    
    return cls;
}

/*
    JW arbitrary mapping.
    
    Copyright (C) 2012 Egor Nepomnyaschih
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    
    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.Map = JW.Class.extend({
    _gc: 0,
    
    set: function(key, value)
    {
        this._items = this._items || [];
        var item = JW.searchBy(this._items, "key", key);
        if (item)
            item.value = value;
        else
            this._items.push({ key: key, value: value });
    },
    
    get: function(key)
    {
        if (!this._items)
            return undefined;
        
        var item = JW.searchBy(this._items, "key", key);
        return item ? item.value : undefined;
    },
    
    del: function(key)
    {
        if (!this._items)
            return undefined;
        
        var index = JW.findBy(this._items, "key", key);
        if (undefined === index)
            return undefined;
        
        var value = this._items[index].value;
        this._items[index] = {};
        
        if (this._items.length < (2 * ++this._gc))
        {
            this._gc = 0;
            this._items = JW.filter(this._items, this._filterFn);
        }
        
        return value;
    },
    
    _filterFn: function(item)
    {
        return item.key !== undefined;
    }
});

/*
    JW sensitive setInterval implementation.
    
    Copyright (C) 2012 Egor Nepomnyaschih
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    
    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.setInterval = function(callback, ms)
{
    if (!ms)
        return setInterval(callback, ms);
    
    var lastTime = Date.getTime();
    
    if (typeof callback == "string")
        callback = JW.Function.insertArgs(eval, 0, callback);
    
    function onInterval()
    {
        var curTime = Date.getTime();
        
        // Prevent inactive time lapses
        if (curTime - lastTime > 10 * ms)
            lastTime = curTime - ms;
        
        var b = true;
        while (b || lastTime < curTime)
        {
            b = false;
            lastTime += ms;
            callback();
        }
    }
    
    return setInterval(onInterval, ms);
}

/*
    JW ordered collection syncher.
    
    Copyright (C) 2012 Egor Nepomnyaschih
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    
    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.Syncher = JW.Config.extend({
    collection  : null,     // [required] JW.Collection
    
    creator     : null,     // [optional] Function(data:Submodel):Subcontroller, defaults to data
    inserter    : null,     // [optional] Function(item:Subcontroller, index:Number, data:Submodel)
    remover     : null,     // [optional] Function(index:Number, data:Submodel, item:Subcontroller)
    destroyer   : null,     // [optional] Function(item:Subcontroller, data:Submodel) or String (method name, takes data as argument)
    clearer     : null,     // [optional] Function()
    indexer     : null,     // [optional] Function(data:Submodel):String or String (getter name), for reordering optimization.
                            // Not used if creator is null. Index value must be unique!
    
    scope       : null,     // [optional] Object
    
    snapshot    : null,     // [readonly] Array of Submodel, last collection snapshot
    items       : null,     // [readonly] Array of Subcontroller
    itemMap     : null,     // [readonly] Map from String to Subcontroller
    
    init: function(config)
    {
        this._super(config);
        
        this.snapshot = [];
        this.items = [];
        this.itemMap = {};
        
        this.collection = JW.Collection.create(this.collection);
        
        this.collection.bind("add",     this._onAdd,     this);
        this.collection.bind("remove",  this._onRemove,  this);
        this.collection.bind("replace", this._onReplace, this);
        this.collection.bind("move",    this._onMove,    this);
        this.collection.bind("clear",   this._onClear,   this);
        this.collection.bind("reorder", this._onReorder, this);
        this.collection.bind("filter",  this._onFilter,  this);
        this.collection.bind("reset",   this._onReset,   this);
        
        this._fill();
    },
    
    destroy: function()
    {
        this.collection.purge(this);
        
        this._clear();
    },
    
    _creator: function(data)
    {
        return (typeof this.creator === "function") ? this.creator.call(this.scope || this, data) : data;
    },
    
    _inserter: function(item, index, data)
    {
        if (typeof this.inserter === "function")
            this.inserter.call(this.scope || this, item, index, data);
    },
    
    _remover: function(index, data, item)
    {
        if (typeof this.remover === "function")
            this.remover.call(this.scope || this, index, data, item);
    },
    
    _destroyer: function(item, data)
    {
        var t = typeof this.destroyer;
        if (t === "string")
            item[this.destroyer](data);
        else if (t === "function")
            this.destroyer.call(this.scope || this, item, data);
    },
    
    _clearer: function()
    {
        if (typeof this.clearer === "function")
            this.clearer.call(this.scope || this);
    },
    
    _indexer: function(data)
    {
        var t = typeof this.indexer;
        if (t === "string")
            return JW.getField(data, this.indexer);
        if (t === "function")
            return this.indexer.call(this.scope || this, data);
    },
    
    _onAdd: function(event, index, data)
    {
        var item = this._creator(data);
        this._inserter(item, index, data);
        
        this.snapshot.splice(index, 0, data);
        this.items.splice(index, 0, item);
        
        if (JW.isSet(this.indexer))
            this.itemMap[this._indexer(data)] = item;
    },
    
    _onRemove: function(event, index, data)
    {
        var item = this.items[index];
        this._remover(index, data, item);
        this._destroyer(item, data);
        
        this.snapshot.splice(index, 1);
        this.items.splice(index, 1);
        
        if (JW.isSet(this.indexer))
            delete this.itemMap[this._indexer(data)];
    },
    
    _onReplace: function(event, index, oldData, newData)
    {
        var oldItem = this.items[index];
        this._remover(index, oldData, oldItem)
        this._destroyer(oldItem, oldData);
        
        var newItem = this._creator(newData);
        this._inserter(newItem, index, newData);
        
        this.snapshot[index] = newData;
        this.items[index] = newItem;
        
        if (JW.isSet(this.indexer))
        {
            delete this.itemMap[this._indexer(oldData)];
            this.itemMap[this._indexer(newData)] = newItem;
        }
    },
    
    _onMove: function(event, fromIndex, toIndex, data)
    {
        var item = this.items[fromIndex];
        this._remover(fromIndex, data, item);
        this._inserter(item, toIndex, data);
        
        this.snapshot.splice(fromIndex, 1);
        this.items.splice(fromIndex, 1);
        
        this.snapshot.splice(toIndex, 0, data);
        this.items.splice(toIndex, 0, item);
    },
    
    _onClear: function()
    {
        this._clear();
    },
    
    _onReorder: function()
    {
        var snapshot = this.snapshot;
        var items = this.items;
        
        this.snapshot = [];
        this.items = [];
        
        this._clearer();
        
        JW.each(this.collection.base, function(data, index) {
            var item;
            if (!this.creator)
            {
                item = data;
            }
            else if (JW.isSet(this.indexer))
            {
                item = this.itemMap[this._indexer(data)];
            }
            else
            {
                var snapshotIndex = JW.Array.indexOf(snapshot, data);
                item = items[snapshotIndex];
                
                // prevent double-insertion of the same item if there are 2 equal data values
                snapshot[snapshotIndex] = {};
            }
            
            this._inserter(item, index, data);
            
            this.snapshot.push(data);
            this.items.push(item);
        }, this);
    },
    
    _onFilter: function()
    {
        var snapshot = this.snapshot;
        var items = this.items;
        
        this.snapshot = [];
        this.items = [];
        
        this._clearer();
        
        var collectionIndex = 0;
        JW.each(snapshot, function(snapshotData, snapshotIndex) {
            var item = items[snapshotIndex];
            
            var collectionData = this.collection.getItemAt(collectionIndex);
            if (snapshotData !== collectionData)
            {
                this._destroyer(item, snapshotData);
                return;
            }
            
            this._inserter(item, collectionIndex, snapshotData);
            
            this.snapshot.push(snapshotData);
            this.items.push(item);
            
            ++collectionIndex;
        }, this);
    },
    
    _onReset: function()
    {
        this._clear();
        this._fill();
    },
    
    _clear: function()
    {
        this._clearer();
        
        for (var i = 0, l = this.items.length; i < l; ++i)
            this._destroyer(this.items[i], this.snapshot[i]);
        
        this.snapshot = [];
        this.items = [];
        this.itemMap = {};
    },
    
    _fill: function()
    {
        JW.each(this.collection.base, JW.Function.as(this._onAdd, this, null, "\1", "\0"));
    }
});

/*
    JW timer.
    
    Copyright (C) 2012 Egor Nepomnyaschih
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    
    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.Timer = JW.Observable.extend({
    // Events
    // tick(event:JW.Event)
    
    delay     : 0,     // [optional] Number
    repeat    : false, // [optional] Boolean
    sensitive : false, // [optional] Boolean
    
    init: function(delay, repeat, sensitive)
    {
        JW.apply(this, {
            delay     : delay,
            repeat    : repeat,
            sensitive : sensitive
        });
    },
    
    start: function()
    {
        if (this.isStarted())
            return;
        
        var runner = this._getRunner();
        this._handle = runner(JW.Function.inScope(this._onTimeout, this), this.delay);
    },
    
    stop: function()
    {
        if (!this.isStarted())
            return;
        
        var stopper = this._getStopper();
        stopper(this._handle);
        delete this._handle;
    },
    
    restart: function()
    {
        this.stop();
        this.start();
    },
    
    isStarted: function()
    {
        return !!this._handle;
    },
    
    _getRunner: function()
    {
        return !this.repeat ? setTimeout : this.sensitive ? JW.setInterval : setInterval;
    },
    
    _getStopper: function()
    {
        return this.repeat ? clearInterval : clearTimeout;
    },
    
    _onTimeout: function()
    {
        this.trigger("tick");
    }
});

/*
    JW standard class prototypes extension.
    
    Copyright (C) 2012 Egor Nepomnyaschih
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    
    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.applyIf(Array   .prototype, JW.Array   ._prototype);
JW.applyIf(Function.prototype, JW.Function._prototype);
JW.applyIf(String  .prototype, JW.String  ._prototype);
