/**
 * Valine comment JSX component.
 * @module view/comment/valine
 */
const { Component, Fragment } = require('inferno');
const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');

/**
 * Valine comment JSX component.
 *
 * @see https://valine.js.org/quickstart.html
 * @example
 * <Valine
 *     appId="******"
 *     appKey="******"
 *     notify={false}
 *     verify={false}
 *     placeholder="******"
 *     avatar="mm"
 *     avatarForce={false}
 *     meta={['nick', 'mail', 'link']}
 *     pageSize={10}
 *     visitor={false}
 *     highlight={true}
 *     recordIp={false}
 *     jsUrl="/path/to/Valine.js" />
 */
class Valine extends Component {
    render() {
        const {
            appId,
            appKey,
            placeholder,
            avatar = 'mm',
            avatarForce = false,
            meta = ['nick', 'mail', 'link'],
            requiredFields = [],
            serverURLs = 'http[s]://[tab/us].avoscloud.com',
            pageSize = 10,
            enableQQ = false,
            visitor = false,
            highlight = true,
            recordIp = false,
            jsUrl
        } = this.props;
        if (!appId || !appKey) {
            return <div class="notification is-danger">
                You forgot to set the <code>app_id</code> or <code>app_key</code> for Valine.
                Please set it in <code>_config.yml</code>.
            </div>;
        }
        const js = `new Valine({
            el: '#valine-thread',
            appId: '${appId}',
            appKey: '${appKey}',
            placeholder: '${placeholder}',
            avatar: '${avatar}',
            avatarForce: ${avatarForce},
            meta: ${JSON.stringify(meta)},
            requiredFields: ${JSON.stringify(requiredFields)},
            serverURLs: '${serverURLs}',
            pageSize: ${pageSize},
            enableQQ: ${enableQQ},
            visitor: ${visitor},
            highlight: ${highlight},
            recordIP: ${recordIp}
        });`;
        return <Fragment>
            <div id="valine-thread" class="content"></div>
            <script src="https://cdn.jsdelivr.net/npm/leancloud-storage/dist/av-min.js"></script>
            <script src={jsUrl}></script>
            <script dangerouslySetInnerHTML={{ __html: js }}></script>
        </Fragment>;
    }
}

/**
 * Cacheable Valine comment JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <Valine.Cacheable
 *     comment={{
 *         app_id="******"
 *         app_key="******"
 *         notify={false}
 *         verify={false}
 *         placeholder="******"
 *         avatar="mm"
 *         avatar_force={false}
 *         meta={['nick', 'mail', 'link']}
 *         page_size={10}
 *         visitor={false}
 *         highlight={true}
 *         record_ip={false}
 *     }}
 *     helper={{ cdn: function() {...} }} />
 */
Valine.Cacheable = cacheComponent(Valine, 'comment.valine', props => {
    const { comment, helper } = props;

    return {
        appId: comment.app_id,
        appKey: comment.app_key,
        placeholder: comment.placeholder,
        avatar: comment.avatar,
        avatarForce: comment.avatar_force,
        meta: comment.meta,
        requiredFields: comment.requiredFields,
        serverURLs: comment.serverURLs,
        pageSize: comment.page_size,
        enableQQ: comment.enableQQ,
        visitor: comment.visitor,
        highlight: comment.highlight,
        recordIp: comment.record_ip,
        jsUrl: helper.url_for('https://cdn.jsdelivr.net/gh/1rz/static@master/hexo/js/Valine.min.js')
    };
});

module.exports = Valine;
