
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function set_store_value(store, ret, value = ret) {
        store.set(value);
        return ret;
    }

    const is_client = typeof window !== 'undefined';
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    // unfortunately this can't be a constant as that wouldn't be tree-shakeable
    // so we cache the result instead
    let crossorigin;
    function is_crossorigin() {
        if (crossorigin === undefined) {
            crossorigin = false;
            try {
                if (typeof window !== 'undefined' && window.parent) {
                    void window.parent.document;
                }
            }
            catch (error) {
                crossorigin = true;
            }
        }
        return crossorigin;
    }
    function add_resize_listener(node, fn) {
        const computed_style = getComputedStyle(node);
        const z_index = (parseInt(computed_style.zIndex) || 0) - 1;
        if (computed_style.position === 'static') {
            node.style.position = 'relative';
        }
        const iframe = element('iframe');
        iframe.setAttribute('style', `display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ` +
            `overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: ${z_index};`);
        iframe.setAttribute('aria-hidden', 'true');
        iframe.tabIndex = -1;
        const crossorigin = is_crossorigin();
        let unsubscribe;
        if (crossorigin) {
            iframe.src = `data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>`;
            unsubscribe = listen(window, 'message', (event) => {
                if (event.source === iframe.contentWindow)
                    fn();
            });
        }
        else {
            iframe.src = 'about:blank';
            iframe.onload = () => {
                unsubscribe = listen(iframe.contentWindow, 'resize', fn);
            };
        }
        append(node, iframe);
        return () => {
            if (crossorigin) {
                unsubscribe();
            }
            else if (unsubscribe && iframe.contentWindow) {
                unsubscribe();
            }
            detach(iframe);
        };
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function destroy_block(block, lookup) {
        block.d(1);
        lookup.delete(block.key);
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error(`Cannot have duplicate keys in a keyed each`);
            }
            keys.add(key);
        }
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.23.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev("SvelteDOMSetProperty", { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/components/VideoSelector.svelte generated by Svelte v3.23.0 */
    const file_1 = "src/components/VideoSelector.svelte";

    function create_fragment(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "text");
    			add_location(input, file_1, 11, 0, 216);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*file*/ ctx[0]);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[3]),
    					listen_dev(input, "input", /*handleChange*/ ctx[1], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*file*/ 1 && input.value !== /*file*/ ctx[0]) {
    				set_input_value(input, /*file*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { file = "" } = $$props;
    	const dispatch = createEventDispatcher();

    	function handleChange() {
    		dispatch("change", file);
    	}

    	const writable_props = ["file"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<VideoSelector> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("VideoSelector", $$slots, []);

    	function input_input_handler() {
    		file = this.value;
    		$$invalidate(0, file);
    	}

    	$$self.$set = $$props => {
    		if ("file" in $$props) $$invalidate(0, file = $$props.file);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		file,
    		dispatch,
    		handleChange
    	});

    	$$self.$inject_state = $$props => {
    		if ("file" in $$props) $$invalidate(0, file = $$props.file);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [file, handleChange, dispatch, input_input_handler];
    }

    class VideoSelector extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { file: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "VideoSelector",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get file() {
    		throw new Error("<VideoSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set file(value) {
    		throw new Error("<VideoSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Cursor.svelte generated by Svelte v3.23.0 */

    const file = "src/components/Cursor.svelte";

    // (28:0) {#if posDenormed}
    function create_if_block(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			set_style(div, "transform", "translate(" + (/*posDenormed*/ ctx[2].x + "px") + ", " + (/*posDenormed*/ ctx[2].y + "px") + ") scale(" + /*scale*/ ctx[3] + ")");
    			attr_dev(div, "class", "svelte-1eavhw6");
    			toggle_class(div, "pressed", /*pressed*/ ctx[0]);
    			toggle_class(div, "scrubbing", /*scrubbing*/ ctx[1]);
    			add_location(div, file, 28, 4, 510);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*posDenormed, scale*/ 12) {
    				set_style(div, "transform", "translate(" + (/*posDenormed*/ ctx[2].x + "px") + ", " + (/*posDenormed*/ ctx[2].y + "px") + ") scale(" + /*scale*/ ctx[3] + ")");
    			}

    			if (dirty & /*pressed*/ 1) {
    				toggle_class(div, "pressed", /*pressed*/ ctx[0]);
    			}

    			if (dirty & /*scrubbing*/ 2) {
    				toggle_class(div, "scrubbing", /*scrubbing*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(28:0) {#if posDenormed}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let if_block_anchor;
    	let if_block = /*posDenormed*/ ctx[2] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*posDenormed*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { position } = $$props;
    	let { container } = $$props;
    	let { pressed } = $$props;
    	let { scrubbing } = $$props;
    	let posDenormed;
    	let rect;

    	function denormalise(position) {
    		if (!container) return position;
    		rect = container.getBoundingClientRect();

    		return {
    			x: position.x * rect.width - 10,
    			y: position.y * rect.height - 10
    		};
    	}

    	const writable_props = ["position", "container", "pressed", "scrubbing"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Cursor> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Cursor", $$slots, []);

    	$$self.$set = $$props => {
    		if ("position" in $$props) $$invalidate(4, position = $$props.position);
    		if ("container" in $$props) $$invalidate(5, container = $$props.container);
    		if ("pressed" in $$props) $$invalidate(0, pressed = $$props.pressed);
    		if ("scrubbing" in $$props) $$invalidate(1, scrubbing = $$props.scrubbing);
    	};

    	$$self.$capture_state = () => ({
    		position,
    		container,
    		pressed,
    		scrubbing,
    		posDenormed,
    		rect,
    		denormalise,
    		scale
    	});

    	$$self.$inject_state = $$props => {
    		if ("position" in $$props) $$invalidate(4, position = $$props.position);
    		if ("container" in $$props) $$invalidate(5, container = $$props.container);
    		if ("pressed" in $$props) $$invalidate(0, pressed = $$props.pressed);
    		if ("scrubbing" in $$props) $$invalidate(1, scrubbing = $$props.scrubbing);
    		if ("posDenormed" in $$props) $$invalidate(2, posDenormed = $$props.posDenormed);
    		if ("rect" in $$props) rect = $$props.rect;
    		if ("scale" in $$props) $$invalidate(3, scale = $$props.scale);
    	};

    	let scale;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*position*/ 16) {
    			 $$invalidate(2, posDenormed = denormalise(position));
    		}

    		if ($$self.$$.dirty & /*pressed*/ 1) {
    			 $$invalidate(3, scale = pressed ? 2 : 1);
    		}
    	};

    	return [pressed, scrubbing, posDenormed, scale, position, container];
    }

    class Cursor extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
    			position: 4,
    			container: 5,
    			pressed: 0,
    			scrubbing: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Cursor",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*position*/ ctx[4] === undefined && !("position" in props)) {
    			console.warn("<Cursor> was created without expected prop 'position'");
    		}

    		if (/*container*/ ctx[5] === undefined && !("container" in props)) {
    			console.warn("<Cursor> was created without expected prop 'container'");
    		}

    		if (/*pressed*/ ctx[0] === undefined && !("pressed" in props)) {
    			console.warn("<Cursor> was created without expected prop 'pressed'");
    		}

    		if (/*scrubbing*/ ctx[1] === undefined && !("scrubbing" in props)) {
    			console.warn("<Cursor> was created without expected prop 'scrubbing'");
    		}
    	}

    	get position() {
    		throw new Error("<Cursor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set position(value) {
    		throw new Error("<Cursor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get container() {
    		throw new Error("<Cursor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set container(value) {
    		throw new Error("<Cursor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pressed() {
    		throw new Error("<Cursor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pressed(value) {
    		throw new Error("<Cursor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get scrubbing() {
    		throw new Error("<Cursor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set scrubbing(value) {
    		throw new Error("<Cursor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    function createAnnotations() {
    	const { subscribe, set, update } = writable([]);

    	return {
    		subscribe,
    		add: (ann) => update(anns => [...anns, ann]),
    		reset: () => set([])
    	};
    }

    const annotations = createAnnotations();
    const frames = writable([]);

    const resolution = 10;

    function time2frame(time) {
        return Math.round(time*resolution);
    }

    function frame2time(frame) {
        return frame/resolution;
    }

    /* src/components/Annotator.svelte generated by Svelte v3.23.0 */

    const { console: console_1 } = globals;

    const file$1 = "src/components/Annotator.svelte";

    // (141:8) {#if visible}
    function create_if_block$1(ctx) {
    	let current;

    	const cursor = new Cursor({
    			props: {
    				position: /*position*/ ctx[1],
    				pressed: /*pressed*/ ctx[2],
    				container: /*container*/ ctx[0],
    				scrubbing: /*scrubbing*/ ctx[3]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(cursor.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(cursor, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const cursor_changes = {};
    			if (dirty & /*position*/ 2) cursor_changes.position = /*position*/ ctx[1];
    			if (dirty & /*pressed*/ 4) cursor_changes.pressed = /*pressed*/ ctx[2];
    			if (dirty & /*container*/ 1) cursor_changes.container = /*container*/ ctx[0];
    			if (dirty & /*scrubbing*/ 8) cursor_changes.scrubbing = /*scrubbing*/ ctx[3];
    			cursor.$set(cursor_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(cursor.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(cursor.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(cursor, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(141:8) {#if visible}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div2;
    	let div1;
    	let t;
    	let div0;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*visible*/ ctx[4] && create_if_block$1(ctx);
    	const default_slot_template = /*$$slots*/ ctx[16].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], null);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			if (if_block) if_block.c();
    			t = space();
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div0, "class", "svelte-knzzfp");
    			add_location(div0, file$1, 143, 8, 3588);
    			attr_dev(div1, "class", "video svelte-knzzfp");
    			add_location(div1, file$1, 139, 4, 3456);
    			attr_dev(div2, "class", "svelte-knzzfp");
    			add_location(div2, file$1, 138, 0, 3301);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			if (if_block) if_block.m(div1, null);
    			append_dev(div1, t);
    			append_dev(div1, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			/*div0_binding*/ ctx[17](div0);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "keydown", /*handleKeydown*/ ctx[8], false, false, false),
    					listen_dev(window, "keyup", /*handleKeyup*/ ctx[9], false, false, false),
    					listen_dev(window, "mousemove", /*handleMousemove*/ ctx[5], false, false, false),
    					listen_dev(window, "mouseup", /*handleMouseup*/ ctx[6], false, false, false),
    					listen_dev(div2, "mousedown", /*handleMousedown*/ ctx[7], false, false, false),
    					listen_dev(div2, "contextmenu", prevent_default(handleRightClick), false, true, false),
    					listen_dev(div2, "mouseleave", /*mouseleave_handler*/ ctx[18], false, false, false),
    					listen_dev(
    						div2,
    						"mouseenter",
    						function () {
    							if (is_function(/*visible*/ ctx[4] = true)) (/*visible*/ ctx[4] = true).apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (/*visible*/ ctx[4]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*visible*/ 16) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div1, t);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 32768) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[15], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (if_block) if_block.d();
    			if (default_slot) default_slot.d(detaching);
    			/*div0_binding*/ ctx[17](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function handleRightClick() {
    	return false;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $frames;
    	validate_store(frames, "frames");
    	component_subscribe($$self, frames, $$value => $$invalidate(13, $frames = $$value));
    	let position;
    	let { container } = $$props;
    	let pressed;
    	let scrubbing = false;
    	let visible;
    	let track = 0;
    	let { time } = $$props;

    	function getNormalisedPosition(position) {
    		let rect = container.getBoundingClientRect();
    		let x = position.x - rect.left;
    		let y = position.y - rect.top;
    		return { x: x / rect.width, y: y / rect.height };
    	}

    	function handleMousemove(e) {
    		$$invalidate(1, position = getNormalisedPosition({ x: e.clientX, y: e.clientY }));

    		if (pressed) {
    			set_store_value(frames, $frames[time2frame(time)] = { ...position, track, time }, $frames);
    		}

    		if (scrubbing) {
    			set_store_value(frames, $frames[time2frame(time)] = null, $frames);
    		}

    		if (pressed || scrubbing) {
    			annotations.add({
    				...position,
    				time,
    				track,
    				left: pressed,
    				right: scrubbing
    			});
    		} // console.log($frames)
    	}

    	let ticker;

    	function handleMouseup(e) {
    		$$invalidate(2, pressed = false);
    		$$invalidate(1, position = getNormalisedPosition({ x: e.clientX, y: e.clientY }));
    		clearInterval(ticker);
    		ticker = null;
    		$$invalidate(3, scrubbing = false);
    	}

    	function handleMousedown(e) {
    		if (e.buttons == 1) {
    			$$invalidate(2, pressed = true);
    			$$invalidate(3, scrubbing = false);
    			track += 1;
    		}

    		if (e.buttons == 2) {
    			$$invalidate(2, pressed = false);
    			$$invalidate(3, scrubbing = true);
    		}

    		ticker = setInterval(
    			() => {
    				if (pressed) {
    					set_store_value(frames, $frames[time2frame(time)] = { ...position, track, time }, $frames);
    				}

    				if (scrubbing) {
    					set_store_value(frames, $frames[time2frame(time)] = null, $frames);
    				}

    				annotations.add({
    					...position,
    					time,
    					track,
    					left: pressed,
    					right: scrubbing
    				});
    			},
    			50
    		);
    	}

    	function handleKeydown(e) {
    		console.log(e.key);

    		if (e.key === "Backspace") {
    			$$invalidate(3, scrubbing = true);
    			$$invalidate(2, pressed = false);

    			if (!ticker) {
    				ticker = setInterval(
    					() => {
    						if (scrubbing) {
    							set_store_value(frames, $frames[time2frame(time)] = null, $frames);
    						}

    						annotations.add({
    							...position,
    							time,
    							track,
    							left: pressed,
    							right: scrubbing
    						});
    					},
    					50
    				);
    			}
    		}
    	}

    	function handleKeyup(e) {
    		if (e.key === "Backspace") {
    			$$invalidate(3, scrubbing = false);
    			clearInterval(ticker);
    			ticker = null;
    		}
    	}

    	const writable_props = ["container", "time"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Annotator> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Annotator", $$slots, ['default']);

    	function div0_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(0, container = $$value);
    		});
    	}

    	const mouseleave_handler = () => $$invalidate(4, visible = false);

    	$$self.$set = $$props => {
    		if ("container" in $$props) $$invalidate(0, container = $$props.container);
    		if ("time" in $$props) $$invalidate(10, time = $$props.time);
    		if ("$$scope" in $$props) $$invalidate(15, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		Cursor,
    		frames,
    		annotations,
    		time2frame,
    		position,
    		container,
    		pressed,
    		scrubbing,
    		visible,
    		track,
    		time,
    		getNormalisedPosition,
    		handleMousemove,
    		ticker,
    		handleMouseup,
    		handleMousedown,
    		handleRightClick,
    		handleKeydown,
    		handleKeyup,
    		$frames
    	});

    	$$self.$inject_state = $$props => {
    		if ("position" in $$props) $$invalidate(1, position = $$props.position);
    		if ("container" in $$props) $$invalidate(0, container = $$props.container);
    		if ("pressed" in $$props) $$invalidate(2, pressed = $$props.pressed);
    		if ("scrubbing" in $$props) $$invalidate(3, scrubbing = $$props.scrubbing);
    		if ("visible" in $$props) $$invalidate(4, visible = $$props.visible);
    		if ("track" in $$props) track = $$props.track;
    		if ("time" in $$props) $$invalidate(10, time = $$props.time);
    		if ("ticker" in $$props) ticker = $$props.ticker;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		container,
    		position,
    		pressed,
    		scrubbing,
    		visible,
    		handleMousemove,
    		handleMouseup,
    		handleMousedown,
    		handleKeydown,
    		handleKeyup,
    		time,
    		track,
    		ticker,
    		$frames,
    		getNormalisedPosition,
    		$$scope,
    		$$slots,
    		div0_binding,
    		mouseleave_handler
    	];
    }

    class Annotator extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { container: 0, time: 10 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Annotator",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*container*/ ctx[0] === undefined && !("container" in props)) {
    			console_1.warn("<Annotator> was created without expected prop 'container'");
    		}

    		if (/*time*/ ctx[10] === undefined && !("time" in props)) {
    			console_1.warn("<Annotator> was created without expected prop 'time'");
    		}
    	}

    	get container() {
    		throw new Error("<Annotator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set container(value) {
    		throw new Error("<Annotator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get time() {
    		throw new Error("<Annotator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set time(value) {
    		throw new Error("<Annotator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function createVideo() {
    	const { subscribe, set, update } = writable({
            rate: 1,
            src: 'http://localhost:8080/dev/S02_U02_full.mp4',
            duration: 0
        });

    	return {
    		subscribe,
    		play: () => update((s) => ({ ...s, rate: 1 })),
    		pause: () => update((s) => ({ ...s, rate: 0 })),
            setDuration: (duration) => update((s) => ({ ...s, duration })),
            setSrc: (src) => update((s) => ({ ...s, src }))
            
    	};
    }

    function createTime() {
    	const { subscribe, set, update } = writable(0);

    	return {
    		subscribe,
    		forward: (n) => update((s) => s+n),
    		back: (n) => update((s) => s-n),
    		set
    	};
    }

    function createRate() {
    	const { subscribe, set, update } = writable(1);

    	return {
    		subscribe,
    		increase: () => update((s) => Math.min(s+0.5, 4)),
    		deccrease: () => update((s) => Math.max(s-0.5, 0)),
    		set
    	};
    }



    const video = createVideo();
    const time = createTime();
    const rate = createRate();

    /* src/components/VideoProgress.svelte generated by Svelte v3.23.0 */

    const { console: console_1$1 } = globals;
    const file$2 = "src/components/VideoProgress.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	return child_ctx;
    }

    // (46:4) {#each points as point (point.index)}
    function create_each_block(key_1, ctx) {
    	let div;

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "point svelte-b3oqht");
    			set_style(div, "left", /*point*/ ctx[9].index / /*$frames*/ ctx[3].length * 100 + "%");
    			add_location(div, file$2, 46, 2, 1227);
    			this.first = div;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*points, $frames*/ 12) {
    				set_style(div, "left", /*point*/ ctx[9].index / /*$frames*/ ctx[3].length * 100 + "%");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(46:4) {#each points as point (point.index)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let t0;
    	let div1;
    	let div0;
    	let t1;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let mounted;
    	let dispose;
    	let each_value = /*points*/ ctx[2];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*point*/ ctx[9].index;
    	validate_each_keys(ctx, each_value, get_each_context, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			t0 = space();
    			div1 = element("div");
    			div0 = element("div");
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "inner svelte-b3oqht");
    			set_style(div0, "width", /*pct*/ ctx[1] * 100 + "%");
    			add_location(div0, file$2, 44, 4, 1131);
    			attr_dev(div1, "class", "outer svelte-b3oqht");
    			add_location(div1, file$2, 43, 0, 1087);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			/*div1_binding*/ ctx[8](div1);

    			if (!mounted) {
    				dispose = listen_dev(document.body, "click", /*handleOnclick*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*pct*/ 2) {
    				set_style(div0, "width", /*pct*/ ctx[1] * 100 + "%");
    			}

    			if (dirty & /*points, $frames*/ 12) {
    				const each_value = /*points*/ ctx[2];
    				validate_each_argument(each_value);
    				validate_each_keys(ctx, each_value, get_each_context, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div1, destroy_block, create_each_block, null, get_each_context);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			/*div1_binding*/ ctx[8](null);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $video;
    	let $frames;
    	validate_store(video, "video");
    	component_subscribe($$self, video, $$value => $$invalidate(7, $video = $$value));
    	validate_store(frames, "frames");
    	component_subscribe($$self, frames, $$value => $$invalidate(3, $frames = $$value));
    	let element;
    	let { videoElement } = $$props;
    	let { time } = $$props;

    	async function handleOnclick(e) {
    		if (e.target == element) {
    			let rect = element.getBoundingClientRect();
    			let x = e.clientX - rect.left;
    			let pct = x / rect.width;
    			console.log("String: ", (pct * $video.duration).toString());
    			$$invalidate(5, videoElement.currentTime = (pct * $video.duration).toString(), videoElement);
    			console.log(videoElement.currentTime);
    		}
    	}

    	let pct = 0;
    	let points = [];
    	const writable_props = ["videoElement", "time"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$1.warn(`<VideoProgress> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("VideoProgress", $$slots, []);

    	function div1_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(0, element = $$value);
    		});
    	}

    	$$self.$set = $$props => {
    		if ("videoElement" in $$props) $$invalidate(5, videoElement = $$props.videoElement);
    		if ("time" in $$props) $$invalidate(6, time = $$props.time);
    	};

    	$$self.$capture_state = () => ({
    		video,
    		frames,
    		createEventDispatcher,
    		onMount,
    		tick,
    		element,
    		videoElement,
    		time,
    		handleOnclick,
    		pct,
    		points,
    		$video,
    		$frames
    	});

    	$$self.$inject_state = $$props => {
    		if ("element" in $$props) $$invalidate(0, element = $$props.element);
    		if ("videoElement" in $$props) $$invalidate(5, videoElement = $$props.videoElement);
    		if ("time" in $$props) $$invalidate(6, time = $$props.time);
    		if ("pct" in $$props) $$invalidate(1, pct = $$props.pct);
    		if ("points" in $$props) $$invalidate(2, points = $$props.points);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$video, time*/ 192) {
    			 if ($video.duration) {
    				$$invalidate(1, pct = time / $video.duration);
    			}
    		}

    		if ($$self.$$.dirty & /*$frames*/ 8) {
    			 {
    				$$invalidate(2, points = $frames.map((frame, index) => ({ index, hasPosition: frame != null })).filter(({ hasPosition }) => hasPosition));
    			}
    		}
    	};

    	return [
    		element,
    		pct,
    		points,
    		$frames,
    		handleOnclick,
    		videoElement,
    		time,
    		$video,
    		div1_binding
    	];
    }

    class VideoProgress extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { videoElement: 5, time: 6 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "VideoProgress",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*videoElement*/ ctx[5] === undefined && !("videoElement" in props)) {
    			console_1$1.warn("<VideoProgress> was created without expected prop 'videoElement'");
    		}

    		if (/*time*/ ctx[6] === undefined && !("time" in props)) {
    			console_1$1.warn("<VideoProgress> was created without expected prop 'time'");
    		}
    	}

    	get videoElement() {
    		throw new Error("<VideoProgress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set videoElement(value) {
    		throw new Error("<VideoProgress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get time() {
    		throw new Error("<VideoProgress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set time(value) {
    		throw new Error("<VideoProgress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/VideoProgressContext.svelte generated by Svelte v3.23.0 */
    const file$3 = "src/components/VideoProgressContext.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[15] = list[i];
    	return child_ctx;
    }

    // (85:4) {#each points as point (point.index)}
    function create_each_block$1(key_1, ctx) {
    	let div;

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "point svelte-ny096z");
    			set_style(div, "transform", "translate(" + /*point*/ ctx[15].position * /*width*/ ctx[4] / 100 + "px, -50%)");
    			add_location(div, file$3, 85, 2, 2217);
    			this.first = div;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*points, width*/ 24) {
    				set_style(div, "transform", "translate(" + /*point*/ ctx[15].position * /*width*/ ctx[4] / 100 + "px, -50%)");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(85:4) {#each points as point (point.index)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let t0;
    	let div0;
    	let t1_value = format(/*time*/ ctx[0]) + "";
    	let t1;
    	let t2;
    	let div5;
    	let div1;
    	let t3;
    	let div2;
    	let t4;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let t5;
    	let div3;
    	let t7;
    	let div4;
    	let div5_resize_listener;
    	let mounted;
    	let dispose;
    	let each_value = /*points*/ ctx[3];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*point*/ ctx[15].index;
    	validate_each_keys(ctx, each_value, get_each_context$1, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$1(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			t0 = space();
    			div0 = element("div");
    			t1 = text(t1_value);
    			t2 = space();
    			div5 = element("div");
    			div1 = element("div");
    			t3 = space();
    			div2 = element("div");
    			t4 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t5 = space();
    			div3 = element("div");
    			div3.textContent = "-10";
    			t7 = space();
    			div4 = element("div");
    			div4.textContent = "+10";
    			attr_dev(div0, "class", "time svelte-ny096z");
    			add_location(div0, file$3, 80, 0, 1981);
    			attr_dev(div1, "class", "inner svelte-ny096z");
    			set_style(div1, "width", /*pct*/ ctx[2] * 100 + "%");
    			add_location(div1, file$3, 82, 4, 2090);
    			attr_dev(div2, "class", "centre svelte-ny096z");
    			add_location(div2, file$3, 83, 4, 2146);
    			attr_dev(div3, "class", "left svelte-ny096z");
    			add_location(div3, file$3, 87, 4, 2321);
    			attr_dev(div4, "class", "right svelte-ny096z");
    			add_location(div4, file$3, 88, 4, 2354);
    			attr_dev(div5, "class", "outer svelte-ny096z");
    			add_render_callback(() => /*div5_elementresize_handler*/ ctx[14].call(div5));
    			add_location(div5, file$3, 81, 0, 2021);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div1);
    			append_dev(div5, t3);
    			append_dev(div5, div2);
    			append_dev(div5, t4);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div5, null);
    			}

    			append_dev(div5, t5);
    			append_dev(div5, div3);
    			append_dev(div5, t7);
    			append_dev(div5, div4);
    			/*div5_binding*/ ctx[13](div5);
    			div5_resize_listener = add_resize_listener(div5, /*div5_elementresize_handler*/ ctx[14].bind(div5));

    			if (!mounted) {
    				dispose = listen_dev(document.body, "click", /*handleOnclick*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*time*/ 1 && t1_value !== (t1_value = format(/*time*/ ctx[0]) + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*pct*/ 4) {
    				set_style(div1, "width", /*pct*/ ctx[2] * 100 + "%");
    			}

    			if (dirty & /*points, width*/ 24) {
    				const each_value = /*points*/ ctx[3];
    				validate_each_argument(each_value);
    				validate_each_keys(ctx, each_value, get_each_context$1, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div5, destroy_block, create_each_block$1, t5, get_each_context$1);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div5);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			/*div5_binding*/ ctx[13](null);
    			div5_resize_listener();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function format(seconds) {
    	if (isNaN(seconds)) return "...";
    	const minutes = Math.floor(seconds / 60);
    	seconds = Math.floor(seconds % 60);
    	if (seconds < 10) seconds = "0" + seconds;
    	return `${minutes}:${seconds}`;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let $video;
    	let $frames;
    	validate_store(video, "video");
    	component_subscribe($$self, video, $$value => $$invalidate(9, $video = $$value));
    	validate_store(frames, "frames");
    	component_subscribe($$self, frames, $$value => $$invalidate(10, $frames = $$value));
    	let element;
    	let { videoElement } = $$props;
    	let { time } = $$props;
    	let { context = 5 } = $$props;
    	let lasttime = time;

    	async function handleOnclick(e) {
    		if (e.target == element) {
    			let rect = element.getBoundingClientRect();
    			let x = e.clientX - rect.left;
    			let pct = x / rect.width;
    			let delta = pct * context - context / 2;
    			$$invalidate(6, videoElement.currentTime += delta, videoElement);
    		}
    	}

    	let pct = 0;

    	function calcLeft(frame, t) {
    		let pointTime = frame2time(frame);
    		let distance = pointTime - t;
    		return (distance / context + 1 / 2) * 100;
    	}

    	let ticker;
    	let points = [];

    	onMount(() => {
    		ticker = setInterval(
    			() => {
    				if ($video.paused) {
    					return;
    				}

    				let pts = $frames.map((frame, index) => ({
    					...frame,
    					index,
    					hasPosition: frame != null,
    					position: calcLeft(index, time)
    				})).filter(({ hasPosition, position }) => hasPosition && (// Don't render if outside of element
    				position >= 0 && position <= 100));

    				$$invalidate(3, points = pts);
    			},
    			20
    		);
    	});

    	onDestroy(() => {
    		clearInterval(ticker);
    	});

    	let width;
    	const writable_props = ["videoElement", "time", "context"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<VideoProgressContext> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("VideoProgressContext", $$slots, []);

    	function div5_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(1, element = $$value);
    		});
    	}

    	function div5_elementresize_handler() {
    		width = this.clientWidth;
    		$$invalidate(4, width);
    	}

    	$$self.$set = $$props => {
    		if ("videoElement" in $$props) $$invalidate(6, videoElement = $$props.videoElement);
    		if ("time" in $$props) $$invalidate(0, time = $$props.time);
    		if ("context" in $$props) $$invalidate(7, context = $$props.context);
    	};

    	$$self.$capture_state = () => ({
    		video,
    		frames,
    		createEventDispatcher,
    		onMount,
    		tick,
    		onDestroy,
    		frame2time,
    		format,
    		element,
    		videoElement,
    		time,
    		context,
    		lasttime,
    		handleOnclick,
    		pct,
    		calcLeft,
    		ticker,
    		points,
    		width,
    		$video,
    		$frames
    	});

    	$$self.$inject_state = $$props => {
    		if ("element" in $$props) $$invalidate(1, element = $$props.element);
    		if ("videoElement" in $$props) $$invalidate(6, videoElement = $$props.videoElement);
    		if ("time" in $$props) $$invalidate(0, time = $$props.time);
    		if ("context" in $$props) $$invalidate(7, context = $$props.context);
    		if ("lasttime" in $$props) lasttime = $$props.lasttime;
    		if ("pct" in $$props) $$invalidate(2, pct = $$props.pct);
    		if ("ticker" in $$props) ticker = $$props.ticker;
    		if ("points" in $$props) $$invalidate(3, points = $$props.points);
    		if ("width" in $$props) $$invalidate(4, width = $$props.width);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$video, time*/ 513) {
    			 if ($video.duration) {
    				$$invalidate(2, pct = time / $video.duration);
    			}
    		}
    	};

    	return [
    		time,
    		element,
    		pct,
    		points,
    		width,
    		handleOnclick,
    		videoElement,
    		context,
    		ticker,
    		$video,
    		$frames,
    		lasttime,
    		calcLeft,
    		div5_binding,
    		div5_elementresize_handler
    	];
    }

    class VideoProgressContext extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { videoElement: 6, time: 0, context: 7 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "VideoProgressContext",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*videoElement*/ ctx[6] === undefined && !("videoElement" in props)) {
    			console.warn("<VideoProgressContext> was created without expected prop 'videoElement'");
    		}

    		if (/*time*/ ctx[0] === undefined && !("time" in props)) {
    			console.warn("<VideoProgressContext> was created without expected prop 'time'");
    		}
    	}

    	get videoElement() {
    		throw new Error("<VideoProgressContext>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set videoElement(value) {
    		throw new Error("<VideoProgressContext>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get time() {
    		throw new Error("<VideoProgressContext>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set time(value) {
    		throw new Error("<VideoProgressContext>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get context() {
    		throw new Error("<VideoProgressContext>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set context(value) {
    		throw new Error("<VideoProgressContext>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/AnnotationVideoViewer.svelte generated by Svelte v3.23.0 */
    const file$4 = "src/components/AnnotationVideoViewer.svelte";

    // (23:0) {#if ann}
    function create_if_block$2(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "point svelte-4t8lej");
    			set_style(div, "transform", "translate(" + (/*denormalise*/ ctx[2](/*ann*/ ctx[1]).x + "px") + ", " + (/*denormalise*/ ctx[2](/*ann*/ ctx[1]).y + "px") + ")");
    			add_location(div, file$4, 23, 4, 521);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*ann*/ 2) {
    				set_style(div, "transform", "translate(" + (/*denormalise*/ ctx[2](/*ann*/ ctx[1]).x + "px") + ", " + (/*denormalise*/ ctx[2](/*ann*/ ctx[1]).y + "px") + ")");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(23:0) {#if ann}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let t0;
    	let t1;
    	let t2;
    	let t3_value = JSON.stringify(/*ann*/ ctx[1]) + "";
    	let t3;
    	let if_block = /*ann*/ ctx[1] && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			t0 = space();
    			t1 = text(/*frame*/ ctx[0]);
    			t2 = space();
    			t3 = text(t3_value);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, t3, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*ann*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					if_block.m(t0.parentNode, t0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*frame*/ 1) set_data_dev(t1, /*frame*/ ctx[0]);
    			if (dirty & /*ann*/ 2 && t3_value !== (t3_value = JSON.stringify(/*ann*/ ctx[1]) + "")) set_data_dev(t3, t3_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(t3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let $frames;
    	validate_store(frames, "frames");
    	component_subscribe($$self, frames, $$value => $$invalidate(5, $frames = $$value));
    	let { time } = $$props;
    	let { container } = $$props;

    	function denormalise(position) {
    		if (!container) return position;
    		let rect = container.getBoundingClientRect();

    		return {
    			x: position.x * rect.width - 5,
    			y: position.y * rect.height - 5
    		};
    	}

    	const writable_props = ["time", "container"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AnnotationVideoViewer> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("AnnotationVideoViewer", $$slots, []);

    	$$self.$set = $$props => {
    		if ("time" in $$props) $$invalidate(3, time = $$props.time);
    		if ("container" in $$props) $$invalidate(4, container = $$props.container);
    	};

    	$$self.$capture_state = () => ({
    		frames,
    		time2frame,
    		time,
    		container,
    		denormalise,
    		frame,
    		ann,
    		$frames
    	});

    	$$self.$inject_state = $$props => {
    		if ("time" in $$props) $$invalidate(3, time = $$props.time);
    		if ("container" in $$props) $$invalidate(4, container = $$props.container);
    		if ("frame" in $$props) $$invalidate(0, frame = $$props.frame);
    		if ("ann" in $$props) $$invalidate(1, ann = $$props.ann);
    	};

    	let frame;
    	let ann;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*time*/ 8) {
    			 $$invalidate(0, frame = time2frame(time));
    		}

    		if ($$self.$$.dirty & /*$frames, time*/ 40) {
    			 $$invalidate(1, ann = $frames[time2frame(time)]);
    		}
    	};

    	return [frame, ann, denormalise, time, container];
    }

    class AnnotationVideoViewer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { time: 3, container: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AnnotationVideoViewer",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*time*/ ctx[3] === undefined && !("time" in props)) {
    			console.warn("<AnnotationVideoViewer> was created without expected prop 'time'");
    		}

    		if (/*container*/ ctx[4] === undefined && !("container" in props)) {
    			console.warn("<AnnotationVideoViewer> was created without expected prop 'container'");
    		}
    	}

    	get time() {
    		throw new Error("<AnnotationVideoViewer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set time(value) {
    		throw new Error("<AnnotationVideoViewer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get container() {
    		throw new Error("<AnnotationVideoViewer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set container(value) {
    		throw new Error("<AnnotationVideoViewer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/VideoAnnotator.svelte generated by Svelte v3.23.0 */

    const { console: console_1$2 } = globals;
    const file$5 = "src/components/VideoAnnotator.svelte";

    // (89:4) <Annotator container={videoElement} bind:time={time}>
    function create_default_slot(ctx) {
    	let video_1;
    	let video_1_src_value;
    	let video_1_updating = false;
    	let video_1_animationframe;
    	let video_1_is_paused = true;
    	let t;
    	let current;
    	let mounted;
    	let dispose;

    	function video_1_timeupdate_handler() {
    		cancelAnimationFrame(video_1_animationframe);

    		if (!video_1.paused) {
    			video_1_animationframe = raf(video_1_timeupdate_handler);
    			video_1_updating = true;
    		}

    		/*video_1_timeupdate_handler*/ ctx[10].call(video_1);
    	}

    	const annotationvideoviewer = new AnnotationVideoViewer({
    			props: {
    				container: /*videoElement*/ ctx[2],
    				time: /*time*/ ctx[3]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			video_1 = element("video");
    			t = space();
    			create_component(annotationvideoviewer.$$.fragment);
    			if (video_1.src !== (video_1_src_value = /*$video*/ ctx[6].src)) attr_dev(video_1, "src", video_1_src_value);
    			attr_dev(video_1, "class", "svelte-15dmtw6");
    			if (/*duration*/ ctx[1] === void 0) add_render_callback(() => /*video_1_durationchange_handler*/ ctx[11].call(video_1));
    			if (/*seeking*/ ctx[4] === void 0) add_render_callback(() => /*video_1_seeking_seeked_handler*/ ctx[12].call(video_1));
    			add_location(video_1, file$5, 89, 8, 2030);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, video_1, anchor);
    			/*video_1_binding*/ ctx[13](video_1);

    			if (!isNaN(/*$rate*/ ctx[5])) {
    				video_1.playbackRate = /*$rate*/ ctx[5];
    			}

    			insert_dev(target, t, anchor);
    			mount_component(annotationvideoviewer, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(video_1, "timeupdate", video_1_timeupdate_handler),
    					listen_dev(video_1, "durationchange", /*video_1_durationchange_handler*/ ctx[11]),
    					listen_dev(video_1, "seeking", /*video_1_seeking_seeked_handler*/ ctx[12]),
    					listen_dev(video_1, "seeked", /*video_1_seeking_seeked_handler*/ ctx[12]),
    					listen_dev(video_1, "play", /*video_1_play_pause_handler*/ ctx[14]),
    					listen_dev(video_1, "pause", /*video_1_play_pause_handler*/ ctx[14]),
    					listen_dev(video_1, "ratechange", /*video_1_ratechange_handler*/ ctx[15])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*$video*/ 64 && video_1.src !== (video_1_src_value = /*$video*/ ctx[6].src)) {
    				attr_dev(video_1, "src", video_1_src_value);
    			}

    			if (!video_1_updating && dirty & /*time*/ 8 && !isNaN(/*time*/ ctx[3])) {
    				video_1.currentTime = /*time*/ ctx[3];
    			}

    			video_1_updating = false;

    			if (dirty & /*paused*/ 1 && video_1_is_paused !== (video_1_is_paused = /*paused*/ ctx[0])) {
    				video_1[video_1_is_paused ? "pause" : "play"]();
    			}

    			if (dirty & /*$rate*/ 32 && !isNaN(/*$rate*/ ctx[5])) {
    				video_1.playbackRate = /*$rate*/ ctx[5];
    			}

    			const annotationvideoviewer_changes = {};
    			if (dirty & /*videoElement*/ 4) annotationvideoviewer_changes.container = /*videoElement*/ ctx[2];
    			if (dirty & /*time*/ 8) annotationvideoviewer_changes.time = /*time*/ ctx[3];
    			annotationvideoviewer.$set(annotationvideoviewer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(annotationvideoviewer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(annotationvideoviewer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(video_1);
    			/*video_1_binding*/ ctx[13](null);
    			if (detaching) detach_dev(t);
    			destroy_component(annotationvideoviewer, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(89:4) <Annotator container={videoElement} bind:time={time}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let div;
    	let updating_time;
    	let t0;
    	let updating_time_1;
    	let t1;
    	let updating_time_2;
    	let current;
    	let mounted;
    	let dispose;

    	function videoprogress_time_binding(value) {
    		/*videoprogress_time_binding*/ ctx[9].call(null, value);
    	}

    	let videoprogress_props = { videoElement: /*videoElement*/ ctx[2] };

    	if (/*time*/ ctx[3] !== void 0) {
    		videoprogress_props.time = /*time*/ ctx[3];
    	}

    	const videoprogress = new VideoProgress({
    			props: videoprogress_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(videoprogress, "time", videoprogress_time_binding));

    	function annotator_time_binding(value) {
    		/*annotator_time_binding*/ ctx[16].call(null, value);
    	}

    	let annotator_props = {
    		container: /*videoElement*/ ctx[2],
    		$$slots: { default: [create_default_slot] },
    		$$scope: { ctx }
    	};

    	if (/*time*/ ctx[3] !== void 0) {
    		annotator_props.time = /*time*/ ctx[3];
    	}

    	const annotator = new Annotator({ props: annotator_props, $$inline: true });
    	binding_callbacks.push(() => bind(annotator, "time", annotator_time_binding));

    	function videoprogresscontext_time_binding(value) {
    		/*videoprogresscontext_time_binding*/ ctx[17].call(null, value);
    	}

    	let videoprogresscontext_props = {
    		context: 20,
    		videoElement: /*videoElement*/ ctx[2]
    	};

    	if (/*time*/ ctx[3] !== void 0) {
    		videoprogresscontext_props.time = /*time*/ ctx[3];
    	}

    	const videoprogresscontext = new VideoProgressContext({
    			props: videoprogresscontext_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(videoprogresscontext, "time", videoprogresscontext_time_binding));

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(videoprogress.$$.fragment);
    			t0 = space();
    			create_component(annotator.$$.fragment);
    			t1 = space();
    			create_component(videoprogresscontext.$$.fragment);
    			attr_dev(div, "class", "video svelte-15dmtw6");
    			toggle_class(div, "seeking", /*seeking*/ ctx[4]);
    			add_location(div, file$5, 86, 0, 1876);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(videoprogress, div, null);
    			append_dev(div, t0);
    			mount_component(annotator, div, null);
    			append_dev(div, t1);
    			mount_component(videoprogresscontext, div, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(window, "keydown", /*handleKeydown*/ ctx[7], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const videoprogress_changes = {};
    			if (dirty & /*videoElement*/ 4) videoprogress_changes.videoElement = /*videoElement*/ ctx[2];

    			if (!updating_time && dirty & /*time*/ 8) {
    				updating_time = true;
    				videoprogress_changes.time = /*time*/ ctx[3];
    				add_flush_callback(() => updating_time = false);
    			}

    			videoprogress.$set(videoprogress_changes);
    			const annotator_changes = {};
    			if (dirty & /*videoElement*/ 4) annotator_changes.container = /*videoElement*/ ctx[2];

    			if (dirty & /*$$scope, videoElement, time, $video, duration, seeking, paused, $rate*/ 262271) {
    				annotator_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_time_1 && dirty & /*time*/ 8) {
    				updating_time_1 = true;
    				annotator_changes.time = /*time*/ ctx[3];
    				add_flush_callback(() => updating_time_1 = false);
    			}

    			annotator.$set(annotator_changes);
    			const videoprogresscontext_changes = {};
    			if (dirty & /*videoElement*/ 4) videoprogresscontext_changes.videoElement = /*videoElement*/ ctx[2];

    			if (!updating_time_2 && dirty & /*time*/ 8) {
    				updating_time_2 = true;
    				videoprogresscontext_changes.time = /*time*/ ctx[3];
    				add_flush_callback(() => updating_time_2 = false);
    			}

    			videoprogresscontext.$set(videoprogresscontext_changes);

    			if (dirty & /*seeking*/ 16) {
    				toggle_class(div, "seeking", /*seeking*/ ctx[4]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(videoprogress.$$.fragment, local);
    			transition_in(annotator.$$.fragment, local);
    			transition_in(videoprogresscontext.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(videoprogress.$$.fragment, local);
    			transition_out(annotator.$$.fragment, local);
    			transition_out(videoprogresscontext.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(videoprogress);
    			destroy_component(annotator);
    			destroy_component(videoprogresscontext);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let $rate;
    	let $frames;
    	let $video;
    	validate_store(rate, "rate");
    	component_subscribe($$self, rate, $$value => $$invalidate(5, $rate = $$value));
    	validate_store(frames, "frames");
    	component_subscribe($$self, frames, $$value => $$invalidate(8, $frames = $$value));
    	validate_store(video, "video");
    	component_subscribe($$self, video, $$value => $$invalidate(6, $video = $$value));
    	let paused = true;
    	let duration;
    	let videoElement;
    	let time = 0;
    	let seeking;

    	async function handleKeydown(e) {
    		if (e.key == " ") {
    			$$invalidate(0, paused = !paused);
    			e.preventDefault();
    		}

    		if (e.key == "ArrowLeft") {
    			$$invalidate(2, videoElement.currentTime = time - 1, videoElement);
    		}

    		if (e.key == "ArrowRight") {
    			$$invalidate(2, videoElement.currentTime = time + 1, videoElement);
    		}

    		console.log($rate);

    		if (e.key == "q") {
    			console.log("Increase rate");
    			rate.increase();
    		}

    		if (e.key == "a") {
    			rate.decrease();
    		}
    	}

    	onMount(async () => {
    		videoElement.addEventListener("progress", function () {
    			var loadedPercentage = this.buffered.end(0) / this.duration;
    			console.log(loadedPercentage);
    		});
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$2.warn(`<VideoAnnotator> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("VideoAnnotator", $$slots, []);

    	function videoprogress_time_binding(value) {
    		time = value;
    		$$invalidate(3, time);
    	}

    	function video_1_timeupdate_handler() {
    		time = this.currentTime;
    		$$invalidate(3, time);
    	}

    	function video_1_durationchange_handler() {
    		duration = this.duration;
    		$$invalidate(1, duration);
    	}

    	function video_1_seeking_seeked_handler() {
    		seeking = this.seeking;
    		$$invalidate(4, seeking);
    	}

    	function video_1_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(2, videoElement = $$value);
    		});
    	}

    	function video_1_play_pause_handler() {
    		paused = this.paused;
    		$$invalidate(0, paused);
    	}

    	function video_1_ratechange_handler() {
    		$rate = this.playbackRate;
    		rate.set($rate);
    	}

    	function annotator_time_binding(value) {
    		time = value;
    		$$invalidate(3, time);
    	}

    	function videoprogresscontext_time_binding(value) {
    		time = value;
    		$$invalidate(3, time);
    	}

    	$$self.$capture_state = () => ({
    		Annotator,
    		video,
    		rate,
    		frames,
    		VideoProgress,
    		VideoProgressContext,
    		AnnotationVideoViewer,
    		time2frame,
    		tick,
    		onMount,
    		paused,
    		duration,
    		videoElement,
    		time,
    		seeking,
    		handleKeydown,
    		$rate,
    		$frames,
    		$video
    	});

    	$$self.$inject_state = $$props => {
    		if ("paused" in $$props) $$invalidate(0, paused = $$props.paused);
    		if ("duration" in $$props) $$invalidate(1, duration = $$props.duration);
    		if ("videoElement" in $$props) $$invalidate(2, videoElement = $$props.videoElement);
    		if ("time" in $$props) $$invalidate(3, time = $$props.time);
    		if ("seeking" in $$props) $$invalidate(4, seeking = $$props.seeking);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*duration*/ 2) {
    			 video.setDuration(duration);
    		}

    		if ($$self.$$.dirty & /*duration*/ 2) {
    			 if (duration) {
    				set_store_value(frames, $frames = Array(time2frame(duration)).fill(null));
    				console.log("Total frames", time2frame(duration));
    				console.log("Duration", duration);
    			}
    		}
    	};

    	return [
    		paused,
    		duration,
    		videoElement,
    		time,
    		seeking,
    		$rate,
    		$video,
    		handleKeydown,
    		$frames,
    		videoprogress_time_binding,
    		video_1_timeupdate_handler,
    		video_1_durationchange_handler,
    		video_1_seeking_seeked_handler,
    		video_1_binding,
    		video_1_play_pause_handler,
    		video_1_ratechange_handler,
    		annotator_time_binding,
    		videoprogresscontext_time_binding
    	];
    }

    class VideoAnnotator extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "VideoAnnotator",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/components/AnnotationViewer.svelte generated by Svelte v3.23.0 */
    const file$6 = "src/components/AnnotationViewer.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (16:0) {#each $annotations as annotation}
    function create_each_block$2(ctx) {
    	let li;
    	let t_value = JSON.stringify(/*annotation*/ ctx[3]) + "";
    	let t;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t = text(t_value);
    			attr_dev(li, "class", "svelte-1trduxp");
    			add_location(li, file$6, 16, 4, 323);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$annotations*/ 2 && t_value !== (t_value = JSON.stringify(/*annotation*/ ctx[3]) + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(16:0) {#each $annotations as annotation}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let h3;
    	let t1;
    	let ul;
    	let each_value = /*$annotations*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			h3.textContent = "Log";
    			t1 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h3, file$6, 13, 0, 250);
    			attr_dev(ul, "class", "svelte-1trduxp");
    			add_location(ul, file$6, 14, 0, 263);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			/*ul_binding*/ ctx[2](ul);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*JSON, $annotations*/ 2) {
    				each_value = /*$annotations*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    			/*ul_binding*/ ctx[2](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let $annotations;
    	validate_store(annotations, "annotations");
    	component_subscribe($$self, annotations, $$value => $$invalidate(1, $annotations = $$value));
    	let div;

    	afterUpdate(() => {
    		if (div) {
    			div.scrollTo(0, div.scrollHeight);
    		}
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AnnotationViewer> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("AnnotationViewer", $$slots, []);

    	function ul_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(0, div = $$value);
    		});
    	}

    	$$self.$capture_state = () => ({
    		frames,
    		annotations,
    		afterUpdate,
    		div,
    		$annotations
    	});

    	$$self.$inject_state = $$props => {
    		if ("div" in $$props) $$invalidate(0, div = $$props.div);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [div, $annotations, ul_binding];
    }

    class AnnotationViewer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AnnotationViewer",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    // https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
    function download(filename, text) {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
    }

    /* src/components/DownloadButton.svelte generated by Svelte v3.23.0 */
    const file$7 = "src/components/DownloadButton.svelte";

    function create_fragment$8(ctx) {
    	let button;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (default_slot) default_slot.c();
    			attr_dev(button, "class", "svelte-1w5w4em");
    			add_location(button, file$7, 11, 0, 225);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*handleClick*/ ctx[0], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 8) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[3], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { data } = $$props;
    	let { filename = "untitled.json" } = $$props;

    	function handleClick() {
    		download(filename, JSON.stringify(data));
    	}

    	const writable_props = ["data", "filename"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<DownloadButton> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("DownloadButton", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("data" in $$props) $$invalidate(1, data = $$props.data);
    		if ("filename" in $$props) $$invalidate(2, filename = $$props.filename);
    		if ("$$scope" in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ download, data, filename, handleClick });

    	$$self.$inject_state = $$props => {
    		if ("data" in $$props) $$invalidate(1, data = $$props.data);
    		if ("filename" in $$props) $$invalidate(2, filename = $$props.filename);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [handleClick, data, filename, $$scope, $$slots];
    }

    class DownloadButton extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { data: 1, filename: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DownloadButton",
    			options,
    			id: create_fragment$8.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*data*/ ctx[1] === undefined && !("data" in props)) {
    			console.warn("<DownloadButton> was created without expected prop 'data'");
    		}
    	}

    	get data() {
    		throw new Error("<DownloadButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<DownloadButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get filename() {
    		throw new Error("<DownloadButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set filename(value) {
    		throw new Error("<DownloadButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Header.svelte generated by Svelte v3.23.0 */
    const file$8 = "src/components/Header.svelte";

    // (35:4) {#if focus || ($video.src=='')}
    function create_if_block$3(ctx) {
    	let div;
    	let span;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span = element("span");
    			span.textContent = "Please enter video url";
    			attr_dev(span, "class", "svelte-37n9hx");
    			add_location(span, file$8, 35, 29, 793);
    			attr_dev(div, "class", "blocker svelte-37n9hx");
    			add_location(div, file$8, 35, 8, 772);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(35:4) {#if focus || ($video.src=='')}",
    		ctx
    	});

    	return block;
    }

    // (46:8) <DownloadButton data={$annotations} filename='log.json'>
    function create_default_slot_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Download raw input");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(46:8) <DownloadButton data={$annotations} filename='log.json'>",
    		ctx
    	});

    	return block;
    }

    // (47:8) <DownloadButton data={$frames} filename='labels.json'>
    function create_default_slot$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Download labels");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(47:8) <DownloadButton data={$frames} filename='labels.json'>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let header;
    	let t0;
    	let h1;
    	let t1_value = toName(/*$video*/ ctx[1].src) + "";
    	let t1;
    	let t2;
    	let div1;
    	let div0;
    	let input;
    	let input_value_value;
    	let t3;
    	let t4;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = (/*focus*/ ctx[0] || /*$video*/ ctx[1].src == "") && create_if_block$3(ctx);

    	const downloadbutton0 = new DownloadButton({
    			props: {
    				data: /*$annotations*/ ctx[2],
    				filename: "log.json",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const downloadbutton1 = new DownloadButton({
    			props: {
    				data: /*$frames*/ ctx[3],
    				filename: "labels.json",
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			header = element("header");
    			if (if_block) if_block.c();
    			t0 = space();
    			h1 = element("h1");
    			t1 = text(t1_value);
    			t2 = space();
    			div1 = element("div");
    			div0 = element("div");
    			input = element("input");
    			t3 = space();
    			create_component(downloadbutton0.$$.fragment);
    			t4 = space();
    			create_component(downloadbutton1.$$.fragment);
    			attr_dev(h1, "class", "svelte-37n9hx");
    			add_location(h1, file$8, 37, 4, 849);
    			attr_dev(input, "placeholder", "Location of mp4 file");
    			attr_dev(input, "type", "text");
    			input.value = input_value_value = /*$video*/ ctx[1].src;
    			attr_dev(input, "class", "svelte-37n9hx");
    			add_location(input, file$8, 42, 12, 983);
    			attr_dev(div0, "class", "svelte-37n9hx");
    			toggle_class(div0, "focus", /*focus*/ ctx[0] || /*$video*/ ctx[1].src == "");
    			add_location(div0, file$8, 41, 8, 925);
    			attr_dev(div1, "class", "buttons svelte-37n9hx");
    			add_location(div1, file$8, 40, 4, 895);
    			attr_dev(header, "class", "svelte-37n9hx");
    			add_location(header, file$8, 33, 0, 719);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			if (if_block) if_block.m(header, null);
    			append_dev(header, t0);
    			append_dev(header, h1);
    			append_dev(h1, t1);
    			append_dev(header, t2);
    			append_dev(header, div1);
    			append_dev(div1, div0);
    			append_dev(div0, input);
    			append_dev(div1, t3);
    			mount_component(downloadbutton0, div1, null);
    			append_dev(div1, t4);
    			mount_component(downloadbutton1, div1, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "keypress", handleKey, false, false, false),
    					listen_dev(input, "focus", /*focus_handler*/ ctx[5], false, false, false),
    					listen_dev(input, "blur", /*blur_handler*/ ctx[6], false, false, false),
    					listen_dev(input, "input", /*handleInput*/ ctx[4], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*focus*/ ctx[0] || /*$video*/ ctx[1].src == "") {
    				if (if_block) ; else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					if_block.m(header, t0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if ((!current || dirty & /*$video*/ 2) && t1_value !== (t1_value = toName(/*$video*/ ctx[1].src) + "")) set_data_dev(t1, t1_value);

    			if (!current || dirty & /*$video*/ 2 && input_value_value !== (input_value_value = /*$video*/ ctx[1].src) && input.value !== input_value_value) {
    				prop_dev(input, "value", input_value_value);
    			}

    			if (dirty & /*focus, $video*/ 3) {
    				toggle_class(div0, "focus", /*focus*/ ctx[0] || /*$video*/ ctx[1].src == "");
    			}

    			const downloadbutton0_changes = {};
    			if (dirty & /*$annotations*/ 4) downloadbutton0_changes.data = /*$annotations*/ ctx[2];

    			if (dirty & /*$$scope*/ 128) {
    				downloadbutton0_changes.$$scope = { dirty, ctx };
    			}

    			downloadbutton0.$set(downloadbutton0_changes);
    			const downloadbutton1_changes = {};
    			if (dirty & /*$frames*/ 8) downloadbutton1_changes.data = /*$frames*/ ctx[3];

    			if (dirty & /*$$scope*/ 128) {
    				downloadbutton1_changes.$$scope = { dirty, ctx };
    			}

    			downloadbutton1.$set(downloadbutton1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(downloadbutton0.$$.fragment, local);
    			transition_in(downloadbutton1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(downloadbutton0.$$.fragment, local);
    			transition_out(downloadbutton1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			if (if_block) if_block.d();
    			destroy_component(downloadbutton0);
    			destroy_component(downloadbutton1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function toName(url) {
    	let parts = url.split("/");
    	let name = parts[parts.length - 1];
    	return name;
    }

    function handleKey(e) {
    	e.stopImmediatePropagation();

    	if (e.key == "Enter") {
    		e.target.blur();
    	}

    	if (e.key == "Escape") {
    		e.target.blur();
    	}
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let $video;
    	let $annotations;
    	let $frames;
    	validate_store(video, "video");
    	component_subscribe($$self, video, $$value => $$invalidate(1, $video = $$value));
    	validate_store(annotations, "annotations");
    	component_subscribe($$self, annotations, $$value => $$invalidate(2, $annotations = $$value));
    	validate_store(frames, "frames");
    	component_subscribe($$self, frames, $$value => $$invalidate(3, $frames = $$value));
    	let focus = true;

    	function handleInput(e) {
    		let value = e.target.value;

    		if (value != $video.src) {
    			video.setSrc(value);
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Header", $$slots, []);
    	const focus_handler = () => $$invalidate(0, focus = true);
    	const blur_handler = () => $$invalidate(0, focus = false);

    	$$self.$capture_state = () => ({
    		video,
    		DownloadButton,
    		annotations,
    		frames,
    		focus,
    		toName,
    		handleInput,
    		handleKey,
    		$video,
    		$annotations,
    		$frames
    	});

    	$$self.$inject_state = $$props => {
    		if ("focus" in $$props) $$invalidate(0, focus = $$props.focus);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [focus, $video, $annotations, $frames, handleInput, focus_handler, blur_handler];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.23.0 */
    const file$9 = "src/App.svelte";

    function create_fragment$a(ctx) {
    	let main;
    	let t;
    	let div;
    	let current;
    	const header = new Header({ $$inline: true });
    	const videoannotator = new VideoAnnotator({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(header.$$.fragment);
    			t = space();
    			div = element("div");
    			create_component(videoannotator.$$.fragment);
    			attr_dev(div, "class", "speed");
    			add_location(div, file$9, 24, 1, 607);
    			attr_dev(main, "class", "svelte-1e10v0r");
    			add_location(main, file$9, 21, 0, 586);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(header, main, null);
    			append_dev(main, t);
    			append_dev(main, div);
    			mount_component(videoannotator, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(videoannotator.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(videoannotator.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(header);
    			destroy_component(videoannotator);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const increment = 0.2;

    function instance$a($$self, $$props, $$invalidate) {
    	let { name } = $$props;
    	let buffered;
    	let speed = 1;
    	let currentTime;
    	let paused = true;
    	const writable_props = ["name"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);

    	$$self.$set = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    	};

    	$$self.$capture_state = () => ({
    		VideoSelector,
    		VideoAnnotator,
    		AnnotationViewer,
    		Header,
    		video,
    		time,
    		annotations,
    		frames,
    		onMount,
    		time2frame,
    		name,
    		buffered,
    		speed,
    		increment,
    		currentTime,
    		paused
    	});

    	$$self.$inject_state = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    		if ("buffered" in $$props) buffered = $$props.buffered;
    		if ("speed" in $$props) speed = $$props.speed;
    		if ("currentTime" in $$props) currentTime = $$props.currentTime;
    		if ("paused" in $$props) paused = $$props.paused;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { name: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$a.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[0] === undefined && !("name" in props)) {
    			console.warn("<App> was created without expected prop 'name'");
    		}
    	}

    	get name() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'Video Annotator'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
