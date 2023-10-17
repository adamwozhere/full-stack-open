import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Toggleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });
  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.label}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  );
});

// add a displayname to the forwarded component to prevent lint error
// see: https://stackoverflow.com/questions/67992894/component-definition-is-missing-display-name-for-forwardref
Toggleable.displayName = 'Toggleable';

Toggleable.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Toggleable;
