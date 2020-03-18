import {
  LitElement,
  query,
  customElement,
  html,
  property,
  unsafeCSS
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { MDCTextField } from '@material/textfield';
import { MDCTextFieldIcon } from '@material/textfield/icon';
import { MDCFloatingLabel } from '@material/floating-label';
import * as style from './text-field.scss';

export type TextFieldType =
  | 'text'
  | 'search'
  | 'tel'
  | 'url'
  | 'email'
  | 'password'
  | 'date'
  | 'month'
  | 'week'
  | 'time'
  | 'datetime-local'
  | 'number'
  | 'color';

export const textField = (styles: string) => {
  @customElement('m-text-field')
  class TextField extends LitElement {
    static styles = [unsafeCSS(styles), unsafeCSS(style)];
    @property({ type: Boolean, reflect: true }) wide = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: String }) type: TextFieldType = 'text';
    @property({ type: String }) theme: string = '';
    @property({ type: String }) label = '';
    @property({ type: String }) value = '';
    @property({ type: String }) icon = '';
    @property({ type: String }) iconTrailing = '';
    @property({ type: Boolean }) required = false;
    @property({ type: String }) placeholder = '';
    @property({ type: Number }) maxLength = -1;
    @property({ type: String }) helper = '';
    @property({ type: Boolean }) helperPersistent = false;
    @property({ type: String }) validationMessage = '';
    @property({ type: String }) pattern = '';
    @property({ type: Boolean }) readOnly = false;
    @query('.mdc-text-field') protected textFieldEl!: HTMLElement;
    @query('.mdc-floating-label') protected floatingLabelEl!: HTMLElement;
    @query('.mdc-text-field-icon') protected textFieldIconEl!: HTMLElement;

    textField: MDCTextField | null = null;
    textFieldIcon: MDCTextFieldIcon | null = null;
    floatingLabel: MDCFloatingLabel | null = null;

    connectedCallback() {
      super.connectedCallback();
    }

    firstUpdated() {
      if (this.textFieldEl) {
        this.textField = new MDCTextField(this.textFieldEl);
      }
      if (this.textFieldIconEl) {
        this.textFieldIcon = new MDCTextFieldIcon(this.textFieldIconEl);
      }
      if (this.floatingLabelEl) {
        this.floatingLabel = new MDCFloatingLabel(this.floatingLabelEl);
      }
    }

    protected renderLabel() {
      return !this.label || this.wide
        ? ''
        : html`
            <label for="tfid" class="mdc-floating-label">${this.label}</label>
          `;
    }

    protected renderInput() {
      return html`
        <input
          class="mdc-text-field__input"
          id="tfid"
          ?disabled=${this.disabled}
          type=${this.type}
          .value=${this.value}
          ?required=${this.required}
          ?readonly=${this.readOnly}
          placeholder=${this.placeholder}
        />
      `;
    }

    protected renderIcon(icon: string, trailing: boolean = false) {
      const classes = {
        'mdc-text-field__icon--leading': !trailing,
        'mdc-text-field__icon--trailing': trailing
      };

      return html`
        <i class="material-icons mdc-text-field__icon ${classMap(classes)}"
          >${icon}</i
        >
      `;
    }

    protected renderHelperText() {
      const hidden: boolean = !!this.helper || !!this.validationMessage;
      const classes = {
        'mdc-text-field-helper-text--persistent': this.helperPersistent,
        'mdc-text-field-helper-text--validation-msg': false
      };
      return html`
        <div class="mdc-text-field-helper-line ${classMap({ hidden: hidden })}">
          <div class="mdc-text-field-helper-text ${classMap(classes)}">
            ${this.validationMessage || this.helper}
          </div>
        </div>
      `;
    }

    render() {
      const classes = {
        'mdc-text-field--fullwidth': this.wide,
        'mdc-text-field--disabled': this.disabled,
        'mdc-text-field--no-label': !this.label.length,
        'mdc-text-field--with-leading-icon': this.icon,
        'mdc-text-field--with-trailing-icon': this.iconTrailing
      };
      return html`
        <div class="mdc-text-field primary ${classMap(classes)}">
          ${this.icon ? this.renderIcon(this.icon) : ''} ${this.renderInput()}
          ${this.iconTrailing ? this.renderIcon(this.iconTrailing, true) : ''}
          <div class="mdc-line-ripple"></div>
          ${this.renderLabel()}
        </div>
        ${this.renderHelperText()}
      `;
    }
  }
  return TextField;
};

export default textField;
