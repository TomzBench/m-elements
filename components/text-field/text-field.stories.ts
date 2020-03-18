import { LitElement, customElement, html } from 'lit-element';
import { textField } from './text-field.ts';
import * as styles from './demo-scss.scss';

const TextField = textField(styles.toString());

export default { title: 'text-field' };

export const basic = () => `<m-text-field label="Basic"></m-text-field>`;

export const basicPrimary = () =>
  `<m-text-field theme="primary" label="Primary"></m-text-field>`;

export const wide = () =>
  `<m-text-field label="Wide" wide="true"></m-text-field>`;

export const disabled = () =>
  `<m-text-field label="Disabled" disabled="true"></m-text-field>`;

export const noLabel = () =>
  `<m-text-field placeholder="No Label"></m-text-field>`;

export const icon = () =>
  `<m-text-field icon="search" iconTrailing="person" label="Icon"></m-text-field>`;

export const help = () =>
  `<m-text-field icon="search" helper="Enter password" label="Password"></m-text-field>`;

export const helpPersistent = () =>
  `<m-text-field icon="search" helper="Enter password" helperPersistent label="Password"></m-text-field>`;
