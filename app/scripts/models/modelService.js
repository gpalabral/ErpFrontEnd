/**
 * @class Model
 */
app.factory('Model', function ($log) {

	function invalidClass ( data, add ) {
		var id = data.id ? '#' + data.id : null;
		if ( id ) {
			if ( add ) {
				angular.element(id).addClass('input-field-error');
				$log.warn('you r kidding');
			} else {
				angular.element(id).removeClass('input-field-error');
			}
		}
	}

	/**
	 * Parsing and validating boolean property
	 * @param data
	 * @returns {boolean}
	 */
	function isValidBoolean(data){
		data.value =  !!(( data.value === 'true' || data.value === true ) && !( data.value === 'false' || data.value === false ));
		return (typeof(data.value) === 'boolean' || data.value === 'true' || data.value === 'false');
	}

	/**
	 * Parsing and validating string property
	 * @param data
	 * @returns {boolean}
	 */
	function isValidString ( data ) {
		data.value += "";
		if( typeof(data.value) === 'string' ) {
			if ( data.min  && !(data.value.length >= parseInt(data.min)) ) {
				return false;
			}
			else if ( data.max && !(data.value.length <= parseInt(data.max)) ) {
				return false;
			}
			return true;
		}
		return false;
	}

	/**
	 * Parsing and validating number property
	 * @param data
	 * @returns {boolean}
	 */
	function isValidInteger ( data ) {
		data.value = parseInt(data.value);
		return ( !isNaN(data.value) && data.value !== "" && data.value !== null && data.value > data.biggerThan );
	}

	/**
	 * Parsing and validating float number
	 * @param data
	 * @returns {boolean}
	 */
	function isValidFloat ( data ) {
		data.value = parseFloat(data.value);
		return (!isNaN(data.value) && data.value !== "" && data.value !== null && (!data.hasOwnProperty('biggerThan') || (data.value > data.biggerThan) ) );
	}

	/**
	 * Validating valid object
	 * @param data
	 * @returns {boolean}
	 */
	function isValidObject ( data ) {
		return ( data.hasOwnProperty && !data.push ) ? true : false;
	}

	/**
	 * Validating valid array
	 * @param data
	 * @returns {boolean}
	 */
	function isValidArray ( data ) {
		return ( data.value.push ) ? true : false;
	}

	function matchWithBasicObject (fields, values) {
		var fieldsClone = $.extend(true,{},fields);
		for( var key in fieldsClone ) {
			if( fieldsClone.hasOwnProperty(key) && values.hasOwnProperty(key) ) {
				if ( fieldsClone[key]['type'] === 'object') {
					fieldsClone[key]['fields'] = matchWithBasicObject(fields[key]['fields'], values[key]);
				} else {
					fieldsClone[key]['value'] = values[key];
				}
			}
		}
		return fieldsClone;
	}

	function validateArrayOfObjects ( array, fields ) {
		var isValid = true,
			objectToValidate;
		for ( var i = 0; isValid && i < array.length; i++ ) {
			objectToValidate = matchWithBasicObject(fields, array[i]);
			isValid = isValid && validateObject(objectToValidate);
		}

		return isValid;
	}

	function validateObject (attrs) {
		var attr, isValid = true, valid = true;
		for ( var key in attrs ) {
			if ( attrs.hasOwnProperty( key ) ) {
				attr = attrs[key];
				if ( attr.type.toLowerCase() === 'boolean') {
					isValid = isValidBoolean( attr );
				} else if ( attr.type.toLowerCase() === 'string') {
					isValid = isValidString( attr );
				} else if ( attr.type.toLowerCase() === 'integer') {
					isValid = isValidInteger( attr );
				} else if ( attr.type.toLowerCase() === 'float') {
					isValid = isValidFloat( attr );
				} else if ( attr.type.toLowerCase() === 'number') {
					isValid = isValidFloat( attr );
				} else if ( attr.type.toLowerCase() === 'array') {
					if ( attr.subType == 'object' ) {
						isValid = attr.minLength <= attr.value.length && validateArrayOfObjects (  attr.value, attr.fields  );
					} else {
						isValid = attr.minLength <= attr.value.length && isValidArray( attr );
					}
				} else if ( attr.type.toLowerCase() === 'object') {
					isValid = isValidObject( attr ) && validateObject( attr.fields );
				}
				attr = attrs[key];
				if ( attr.required &&
						( attr.value === '' ||
						  attr.value === null ||
						  attr.value === undefined ||
							!isValid ) ) {
					invalidClass(attr,true);
					valid = false;
				} else {
					invalidClass(attr,false);
				}

				if( (!isValid && attrs.required) ) {
					console.warn("---------------------- no valid: " + key);
				}

				valid = valid && (isValid || !attrs.required);
			}
		}
		return valid;
	}

	/**
	 * setting attributes to object
	 * @param attrs
	 * @param data
	 * @param ref
	 */
	function setAttrs(attrs, data, ref){
		for ( var key in data ) {
			if( data.hasOwnProperty(key) && attrs.hasOwnProperty(key) ) {
				if ( attrs[key].type === 'object' ) {
					setAttrs(attrs[key].fields, data[key], ref)
				} else {
					attrs[key][ref] = data[key];
				}
			}
		}
	}

	/**
	 * getting properties to object
	 * @param attrs
	 * @param ref
	 * @returns {{}}
	 */
	function getPlainObject ( attrs, ref ) {
		var obj = {};
		for ( var key in attrs ) {
			if ( attrs.hasOwnProperty(key) ) {
				if ( attrs[key].type === 'object' ) {
					obj[key] = getPlainObject( attrs[key].fields, ref )
				} else if ( attrs[key].type === 'array' ) {
					obj[key] = [getPlainObject( attrs[key].fields, ref )]
				} else {
					obj[key] = attrs[key][ref];
				}
			}
		}
		return obj;
	}

	return {
		validate : validateObject,
		get : getPlainObject,
		set : setAttrs
	}
});
