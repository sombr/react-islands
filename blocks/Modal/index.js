import React from 'react';

import Component from '../Component';
import Overlay from '../Overlay';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zIndex: 0
        };
        this.shouldRenderToOverlay = false;
        this.onLayerClick = this.onLayerClick.bind(this);
        this.onLayerOrderChange = this.onLayerOrderChange.bind(this);
    }

    componentWillUpdate(nextProps) {
        if (!this.shouldRenderToOverlay && nextProps.visible) {
            this.shouldRenderToOverlay = true;
        }
    }

    render() {
        const { visible } = this.props;
        const style = visible ? { zIndex: this.state.zIndex } : null;

        const children = (
            <div className={this.className()} role="dialog" aria-hidden={!visible} style={style}>
                <div className="modal__table">
                    <div className="modal__cell">
                        <div className="modal__content" ref="content">{this.props.children}</div>
                    </div>
                </div>
            </div>
        );

        if (this.shouldRenderToOverlay) {
            return (
                <Overlay
                    visible={visible}
                    zIndexGroupLevel={this.props.zIndexGroupLevel}
                    onClick={this.onLayerClick}
                    onVisibleChange={this.props.onVisible}
                    onOrderChange={this.onLayerOrderChange}
                >
                    {children}
                </Overlay>
            );
        } else {
            return children
        }
    }

    className() {
        var className = 'popup modal';

        const theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' modal_theme_' + theme;
        }
        if (this.props.size) {
            className += ' modal_size_' + this.props.size;
        }
        if (this.props.visible) {
            className += ' modal_visible';
        }
        if (this.shouldRenderToOverlay) {
            className += ' modal_js_inited modal_has-animation';
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    }

    dispatchClickOutside() {
        this.props.onClickOutside();
    }

    onLayerClick(e) {
        if (!this.refs.content.contains(e.target)) {
            this.dispatchClickOutside();
        }
    }

    onLayerOrderChange(zIndex) {
        this.setState({ zIndex });
    }
}

Modal.defaultProps = {
    zIndexGroupLevel: 20,
    onClickOutside() {},
};

Modal.contextTypes = {
    theme: React.PropTypes.string
};

export default Modal;
