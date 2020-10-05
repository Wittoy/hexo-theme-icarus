const { Component, Fragment } = require('inferno');
const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');

class BackToTop extends Component {
    render() {
        const { title, jsUrl } = this.props;

        return <Fragment>
            <a id="back-to-top" title={title} href="javascript:;">
            <i class="iconfont icon-Chevronupdouble-px"></i>
            </a>
            <script src={jsUrl} defer></script>
        </Fragment>;

    }
}

BackToTop.Cacheable = cacheComponent(BackToTop, 'plugin.backtotop', props => {
    const { helper, head } = props;
    if (head) {
        return null;
    }
    return {
        title: helper.__('plugin.backtotop'),
        jsUrl: helper.mycdn('js/back_to_top.js')
    };
});

module.exports = BackToTop;
