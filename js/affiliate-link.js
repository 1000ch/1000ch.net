import {
  LitElement,
  html,
  css
} from 'https://unpkg.com/lit@2.0.2/index.js?module';

export default class AffiliateLink extends LitElement {
  static get properties() {
    return {
      src: String,
      href: String,
      tag: String,
      title: String
    };
  }

  static get styles() {
    return css`
      a {
        text-decoration: none;
        color: #199ad5;
      }

      a:hover,
      a:active {
        color: #e2007a;
      }

      .AffiliateLink {
        padding: 16px;
        border: 1px solid #ddd;
        font-size: 14px;
      }

      .AffiliateLink::after {
        content: "";
        display: table;
        clear: both;
      }

      img {
        float: left;
        margin-right: 16px;
        width: 120px;
        object-fit: cover;
      }

      h3 {
        margin-top: 0;
        margin-bottom: 8px;
        font-size: 20px;
      }
`;
  }

  render() {
    return html`
      <div class="AffiliateLink">
        <img alt="" src="${this.src}">
        <h3><a href="${this.href}?tag=${this.tag}">${this.title}</a></h3>
        <slot />
      </div>
    `;
  }
}
