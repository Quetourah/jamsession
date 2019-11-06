'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function noop() {}

var MonacoEditor = function (_React$Component) {
  _inherits(MonacoEditor, _React$Component);

  function MonacoEditor(props) {
    _classCallCheck(this, MonacoEditor);

    var _this = _possibleConstructorReturn(this, (MonacoEditor.__proto__ || Object.getPrototypeOf(MonacoEditor)).call(this, props));

    _this.afterViewInit = function () {
      var context = _this.props.context || window;
      if (context.monaco !== undefined) {
        _this.initMonaco();
        return;
      }
      var requireConfig = _this.props.requireConfig;

      // Checking that the process is a renderer may be overly specific

      var inElectron = context.process && context.process.type === 'renderer';

      var loaderUrl = requireConfig.url || 'vs/loader.js';

      if (inElectron) {
        // Running in electron, need to deal with the difference between node require and AMDRequire
        // Save a reference to node's require to set back up later
        context.electronNodeRequire = context.require;
        loaderUrl = requireConfig.url || '../node_modules/monaco-editor/min/vs/loader.js';
      }

      var onGotAmdLoader = function onGotAmdLoader() {
        if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
          // Do not use webpack
          if (inElectron) {
            // Have just loaded loader.js and now context.require is not node's require
            var amdRequireBaseUrl = requireConfig.baseUrl;

            if (!amdRequireBaseUrl) {
              var path = context.electronNodeRequire('path');
              var monacoPath = path.join(context.__dirname, '../node_modules/monaco-editor/min');

              amdRequireBaseUrl = path.resolve(monacoPath).replace(/\\/g, '/');
              if (amdRequireBaseUrl.length > 0 && amdRequireBaseUrl.charAt(0) !== '/') {
                amdRequireBaseUrl = '/' + amdRequireBaseUrl;
              }
              amdRequireBaseUrl = encodeURI('file://' + amdRequireBaseUrl);
            }

            context.require.config({
              baseUrl: amdRequireBaseUrl
            });

            context.window.module = undefined;
            // workaround monaco-typescript not understanding the environment
            context.window.process.browser = true;
          }

          if (requireConfig.paths && requireConfig.paths.vs && !inElectron) {
            // will need to switch to nodeRequire here
            context.require.config(requireConfig);
          }
        }

        // Load monaco
        context.require(['vs/editor/editor.main'], function () {
          _this.initMonaco();
        });

        // Call the delayed callbacks when AMD loader has been loaded
        if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
          context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__ = false;
          var loaderCallbacks = context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__;

          if (loaderCallbacks && loaderCallbacks.length) {
            var currentCallback = loaderCallbacks.shift();

            while (currentCallback) {
              currentCallback.fn.call(currentCallback.context);
              currentCallback = loaderCallbacks.shift();
            }
          }
        }
      };

      // Load AMD loader if necessary
      if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
        // We need to avoid loading multiple loader.js when there are multiple editors loading
        // concurrently, delay to call callbacks except the first one
        // eslint-disable-next-line max-len
        context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__ = context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__ || [];
        context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__.push({
          context: _this,
          fn: onGotAmdLoader
        });
      } else if (typeof context.require === 'undefined' || inElectron) {
        var loaderScript = context.document.createElement('script');
        loaderScript.type = 'text/javascript';
        loaderScript.src = loaderUrl;
        loaderScript.addEventListener('load', onGotAmdLoader);
        context.document.body.appendChild(loaderScript);
        context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__ = true;
      } else {
        onGotAmdLoader();
      }
    };

    _this.assignRef = function (component) {
      _this.containerElement = component;
    };

    _this.containerElement = undefined;
    _this.__current_value = props.value;
    return _this;
  }

  _createClass(MonacoEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.afterViewInit();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var context = this.props.context || window;
      if (this.props.value !== this.__current_value) {
        // Always refer to the latest value
        this.__current_value = this.props.value;
        // Consider the situation of rendering 1+ times before the editor mounted
        if (this.editor) {
          this.__prevent_trigger_change_event = true;
          this.editor.setValue(this.__current_value);
          this.__prevent_trigger_change_event = false;
        }
      }
      if (prevProps.language !== this.props.language) {
        context.monaco.editor.setModelLanguage(this.editor.getModel(), this.props.language);
      }
      if (prevProps.theme !== this.props.theme) {
        context.monaco.editor.setTheme(this.props.theme);
      }
      if (this.editor && (this.props.width !== prevProps.width || this.props.height !== prevProps.height)) {
        this.editor.layout();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.destroyMonaco();
    }
  }, {
    key: 'editorWillMount',
    value: function editorWillMount(monaco) {
      var editorWillMount = this.props.editorWillMount;

      editorWillMount(monaco);
    }
  }, {
    key: 'editorDidMount',
    value: function editorDidMount(editor, monaco) {
      var _this2 = this;

      this.props.editorDidMount(editor, monaco);
      editor.onDidChangeModelContent(function (event) {
        var value = editor.getValue();

        // Always refer to the latest value
        _this2.__current_value = value;

        // Only invoking when user input changed
        if (!_this2.__prevent_trigger_change_event) {
          _this2.props.onChange(value, event);
        }
      });
    }
  }, {
    key: 'initMonaco',
    value: function initMonaco() {
      var value = this.props.value !== null ? this.props.value : this.props.defaultValue;
      var _props = this.props,
          language = _props.language,
          theme = _props.theme,
          options = _props.options;

      var context = this.props.context || window;
      if (this.containerElement && typeof context.monaco !== 'undefined') {
        // Before initializing monaco editor
        this.editorWillMount(context.monaco);
        this.editor = context.monaco.editor.create(this.containerElement, _extends({
          value: value,
          language: language
        }, options));
        if (theme) {
          context.monaco.editor.setTheme(theme);
        }
        // After initializing monaco editor
        this.editorDidMount(this.editor, context.monaco);
      }
    }
  }, {
    key: 'destroyMonaco',
    value: function destroyMonaco() {
      if (typeof this.editor !== 'undefined') {
        this.editor.dispose();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          width = _props2.width,
          height = _props2.height;

      var fixedWidth = width.toString().indexOf('%') !== -1 ? width : width + 'px';
      var fixedHeight = height.toString().indexOf('%') !== -1 ? height : height + 'px';
      var style = {
        width: fixedWidth,
        height: fixedHeight
      };

      return _react2.default.createElement('div', { ref: this.assignRef, style: style, className: 'react-monaco-editor-container' });
    }
  }]);

  return MonacoEditor;
}(_react2.default.Component);

MonacoEditor.propTypes = {
  width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  value: _propTypes2.default.string,
  defaultValue: _propTypes2.default.string,
  language: _propTypes2.default.string,
  theme: _propTypes2.default.string,
  options: _propTypes2.default.object,
  editorDidMount: _propTypes2.default.func,
  editorWillMount: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  requireConfig: _propTypes2.default.object,
  context: _propTypes2.default.object // eslint-disable-line react/require-default-props
};

MonacoEditor.defaultProps = {
  width: '100%',
  height: '100%',
  value: null,
  defaultValue: '',
  language: 'javascript',
  theme: null,
  options: {},
  editorDidMount: noop,
  editorWillMount: noop,
  onChange: noop,
  requireConfig: {}
};

exports.default = MonacoEditor;