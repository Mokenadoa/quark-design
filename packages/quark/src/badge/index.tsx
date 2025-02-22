import { classNames } from '../../utils/index';
import QuarkElement, {
  customElement,
  property,
  state,
  createRef,
} from '@quarkd/core';
import style from './style.css';

@customElement({
  tag: 'quark-badge',
  style,
})
class QuarkBadge extends QuarkElement {
  @property()
  type: string = 'round';

  @property()
  content: string = '';

  @property()
  size: string = 'normal';

  @property({
    type: Boolean,
  })
  border: boolean = false;

  @property()
  max: string = '99';

  @state()
  classNames: string = '';

  slotRef: any = createRef();

  componentDidMount(): void {
    this.dealClass();
  }

  componentDidUpdate(): void {
    this.dealClass();
  }

  dealClass = () => {
    this.classNames = classNames('quark-badge-dealclass', {
      'quark-badge-fixed': this.slotRef.current?.assignedNodes().length,
      'quark-badge-hide': this.type !== 'dot' && (this.content === null || this.content === undefined || !this.content),
    });
  };

  renderContent = () => {
    if (
      /\d/g.test(this.content)
      && /\d/g.test(this.max)
      && Number(this.content) > Number(this.max)
    ) {
      return '...';
    }
    return this.content;
  };

  render() {
    return (
      <div class="quark-badge">
        <div class={this.classNames}>{this.renderContent()}</div>
        <slot ref={this.slotRef} onslotchange={this.dealClass}></slot>
      </div>
    );
  }
}

export default QuarkBadge;
