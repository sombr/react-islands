import React from 'react';

class Component extends React.Component {

}

Component.wrap = function(children, wrapper) {
    var wrapped = [];

    var chunk = null;
    React.Children.forEach(children, child => {
        if (Component.isComponent(child)) {
            if (chunk) {
                wrapped.push(wrapper(chunk));
                chunk = null;
            }
            wrapped.push(child);

        } else if (chunk) {
            chunk.push(child);

        } else {
            chunk = [child];
        }
    });
    if (chunk) {
        wrapped.push(wrapper(chunk));
    }

    return wrapped;
};

Component.isComponent = function(obj) {
    return (React.isValidElement(obj) && obj.type.prototype instanceof Component);
};

export default Component;
