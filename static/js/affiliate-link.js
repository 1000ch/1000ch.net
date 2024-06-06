import {
  LitElement,
  html,
  css
} from 'https://unpkg.com/lit@3.1.4/index.js?module';

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
        width: 120px;
        margin-right: 16px;
        padding: 8px;
        float: left;
        background-color: #fff;
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
    const url = new URL(this.href);
    url.searchParams.set('tag', this.tag);

    return html`
      <div class="AffiliateLink">
        <img alt="" src="${this.src}">
        <h3><a href="${url.toString()}">${this.title}</a></h3>
        <slot />
      </div>
    `;
  }
}
