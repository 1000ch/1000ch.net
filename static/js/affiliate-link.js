import {
  LitElement,
  html,
  css
} from 'https://unpkg.com/lit-element/lit-element.js?module';

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
        display: flex;
        align-items: flex-start;
        padding: 16px;
        border: 1px solid #ddd;
      }

      img {
        margin-right: 16px;
        width: 120px;
        object-fit: cover;
      }

      h3 {
        margin-top: 0;
        margin-bottom: 8px;
        font-size: 20px;
      }

      p {
        margin: 0;
        font-size: 14px;
      }
`;
  }

  render() {
    return html`
      <div class="AffiliateLink">
        <img alt="" src="${this.src}">
        <div>
          <h3><a href="${this.href}?tag=${this.tag}">${this.title}</a></h3>
          <p><slot /></p>
        </div>
      </div>
    `;
  }
}
