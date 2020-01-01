import {
  LitElement,
  html,
  css
} from 'https://unpkg.com/lit-element/lit-element.js?module';

export default class ResponsiveIframe extends LitElement {
  static get properties() {
    return {
      src: String,
      title: String
    };
  }

  static get styles() {
    return css`
      .ResponsiveIframe {
        position: relative;
        width: 100%;
        padding-top: 56.25%;
      }

      .ResponsiveIframe iframe {
        position: absolute;
        top: 0;
        right: 0;
        width: 100% !important;
        height: 100% !important;
      }
`;
  }

  render() {
    return html`
      <div class="ResponsiveIframe">
        <iframe
          src="${this.src}"
          title="${this.title}"
          frameborder="0"
          allowfullscreen>
        </iframe>
      </div>
    `;
  }
}
