'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var MonacoDiffEditor = function (_React$Component) {
  _inherits(MonacoDiffEditor, _React$Component);

  function MonacoDiffEditor(props) {
    _classCallCheck(this, MonacoDiffEditor);

    var _this = _possibleConstructorReturn(this, (MonacoDiffEditor.__proto__ || Object.getPrototypeOf(MonacoDiffEditor)).call(this, props));

    _this.assignRef = function (component) {
      _this.containerElement = component;
    };

    _this.containerElement = undefined;
    _this.__current_value = props.value;
    _this.__current_original = props.original;
    return _this;
  }

  _createClass(MonacoDiffEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.afterViewInit();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var context = this.props.context || window;
      if (this.props.value !== this.__current_value || this.props.original !== this.__current_original) {
        // Always refer to the latest value
        this.__current_value = this.props.value;
        this.__current_original = this.props.original;
        // Consider the situation of rendering 1+ times before the editor mounted
        if (this.editor) {
          this.__prevent_trigger_change_event = true;
          this.updateModel(this.__current_value, this.__current_original);
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
      editor.onDidUpdateDiff(function (event) {
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
    key: 'afterViewInit',
    value: function afterViewInit() {
      var _this3 = this;

      var context = this.props.context || window;
      if (context.monaco !== undefined) {
        this.initMonaco();
        return;
      }
      var requireConfig = this.props.requireConfig;

      var loaderUrl = requireConfig.url || 'vs/loader.js';
      var onGotAmdLoader = function onGotAmdLoader() {
        if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
          // Do not use webpack
          if (requireConfig.paths && requireConfig.paths.vs) {
            context.require.config(requireConfig);
          }
        }

        // Load monaco
        context.require(['vs/editor/editor.main'], function () {
          _this3.initMonaco();
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
          context: this,
          fn: onGotAmdLoader
        });
      } else if (typeof context.require === 'undefined') {
        var loaderScript = context.document.createElement('script');
        loaderScript.type = 'text/javascript';
        loaderScript.src = loaderUrl;
        loaderScript.addEventListener('load', onGotAmdLoader);
        context.document.body.appendChild(loaderScript);
        context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__ = true;
      } else {
        onGotAmdLoader();
      }
    }
  }, {
    key: 'updateModel',
    value: function updateModel(value, original) {
      var context = this.props.context || window;
      var language = this.props.language;

      var originalModel = context.monaco.editor.createModel(original, language);
      var modifiedModel = context.monaco.editor.createModel(value, language);
      this.editor.setModel({
        original: originalModel,
        modified: modifiedModel
      });
    }
  }, {
    key: 'initMonaco',
    value: function initMonaco() {
      var value = this.props.value !== null ? this.props.value : this.props.defaultValue;
      var _props = this.props,
          original = _props.original,
          theme = _props.theme,
          options = _props.options;

      var context = this.props.context || window;
      if (this.containerElement && typeof context.monaco !== 'undefined') {
        // Before initializing monaco editor
        this.editorWillMount(context.monaco);
        this.editor = context.monaco.editor.createDiffEditor(this.containerElement, options);
        if (theme) {
          context.monaco.editor.setTheme(theme);
        }
        // After initializing monaco editor
        this.updateModel(value, original);
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

  return MonacoDiffEditor;
}(_react2.default.Component);

MonacoDiffEditor.propTypes = {
  width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  original: _propTypes2.default.string,
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

MonacoDiffEditor.defaultProps = {
  width: '100%',
  height: '100%',
  original: null,
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

exports.default = MonacoDiffEditor;