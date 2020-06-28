/*
 * @Description: toast
 * @Author: WangYunChuan
 * @Email: wangyunchuan3410@163.com
 * @Date: 2019-12-16 09:31:44
 * @LastEditors: WangYunChuan
 * @LastEditTime: 2019-12-18 11:09:40
 */
    function Toast( options ) {
        this.options = {};
        this.extendOption( options||{} );
        this.mounted();
    }
    Toast.prototype.timer = function(fn) {
        var that = this;
        var timer = setTimeout(function() {
            fn.call(that);
            clearTimeout( timer );
            timer = null;
        },this.options.duration)
    }
    Toast.prototype.extendOption = function( options ) {
        var _default = {
            text : '',
            duration : 2000,
            type : '',
            drop : true
        };
        for( var key in _default ) {
            this.options[key] = options[key] != undefined?options[key] : _default[key];
        }
        return this;
    }
    Toast.prototype.createTemplate = function() {
        var toastIcon = '',
            drop  = 'opacity:0';
				this.options.type && (toastIcon = '<div class="sycat-icon toast-'+this.options.type+'"><div class="loading"><div class="bounce bounce1"></div><div class="bounce bounce2"></div></div></div>');
        this.options.drop && (drop = 'opacity:1');
        var inner = '<div class="sycat-toast-container">'+
            '<div class="sycat-toast-drop" style="'+drop+'"></div>'+
            '<div class="sycat-toast-inner">'+
                toastIcon+
                '<div class="sycat-prompt-text">'+this.options.text+'</div>'+
            '</div>'+
        '</div>';
        return inner;
    }
    Toast.prototype.mounted = function() {
        this.toastOuter = document.createElement('div');
        this.toastOuter.setAttribute('class','sycat-toast-wrapper');
        this.toastOuter.setAttribute('style','display:none');
        this.toastOuter.innerHTML = this.createTemplate();
        document.body.appendChild( this.toastOuter );
        return this;
    }
    Toast.prototype.toast = function( options ) {
        options && this.extendOption( options );
        this.toastOuter.innerHTML = this.createTemplate();
        return this;
		}
		Toast.prototype.preventTouch = function() {
			var eventHandler = function( e ) {
				var event = e || window.e;
				event.preventDefault();
			}
			if( !status ) {
				this.toastOuter.addEventListener('touchmove',eventHandler,false);
			}else{
				this.toastOuter.removeEventListener('touchmove',eventHandler,false);
			}
		}
		Toast.prototype.controls = function( status ) {
			let that = this;
			var sycatInner = document.querySelector('.sycat-toast-inner') || {};
			if( status ) {
				this.toastOuter.style.display = 'block';
				sycatInner.classList.add('zoomIn');
			}else{
				sycatInner.classList.remove('zoomIn');
				sycatInner.classList.add('zoomOut');
				var zoomTimer = setTimeout( function() {
					clearTimeout( zoomTimer );
					zoomTimer = null;
					that.toastOuter.style.display = 'none';
				},300);
			}
		}
    Toast.prototype.show = function() {
				this.controls( true );
				this.preventTouch();
        this.timer(function() {
						this.hide();
						this.preventTouch(true);
        });
        return this;
    }
    Toast.prototype.hide = function() {
        this.controls();
        return this;
    }
    function initialToast( options ) {
				var instance;
				return (function() {
					if( instance ) return instance;
					instance = new Toast( options );
					return instance;
				})()
		}

		export {
			initialToast as toast
		}

