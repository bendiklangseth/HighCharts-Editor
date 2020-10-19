/******************************************************************************

Copyright (c) 2016-2018, Highsoft

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

******************************************************************************/

// @format

/** A standard toolbar.
 *
 *  @example
 *  var toolbar = highed.Toolbar('my-node', {
 *    additionalCSS: ['cool-toolbar']
 *  });
 *
 *  @constructor
 *  @param parent {domnode} - the node to attach the toolbar to
 *  @param attributes {object} - toolbar settings
 *    > additionalCSS {array} - array of additional css classes to add to the toolbar
 */
highed.Toolbar = function(parent, attributes) {
  var properties = highed.merge(
      {
        additionalCSS: []
      },
      attributes
    ),
    container = highed.dom.cr(
      'div',
      'highed-toolbar ' + properties.additionalCSS.join(' ')
    ),
    left = highed.dom.cr('div', 'highed-toolbar-left'),
    right = highed.dom.cr('div', 'highed-toolbar-right'),
    center = highed.dom.cr('div', 'highed-toolbar-center'),
    iconsRight = highed.dom.cr('div', 'icons');

  ///////////////////////////////////////////////////////////////////////////

  /** Add an icon to the toolbar
     *  @memberof highed.Toolbar
     *  @param icon {object} - an object containing the icon settings.
     *    > css {array} - the additional css class(s) to use
     *    > click {function} - the function to call when the icon is clicked
     */
  function addIcon(icon, where) {
    var i = highed.dom.cr('div', 'icon highed-icon fa ' + (icon.css || ''));

    highed.dom.on(i, 'click', function(e) {
      if (highed.isFn(icon.click)) {
        icon.click(e);
      }
    });

    i.title = icon.tooltip || icon.title;

    highed.dom.ap(where === 'left' ? left : right, i);
  }

  /** Add a button to the toolbar
     *  @memberof highed.Toolbar
     *  @param icon {object} - an object containing the icon settings.
     *    > css {array} - the additional css class(s) to use
     *    > click {function} - the function to call when the icon is clicked
     */
  function addButton(icon, where) {
    var i = highed.dom.cr(
      'div',
      'highed-ok-button highed-toolbar-button',
      icon.title || ''
    );

    highed.dom.on(i, 'click', function(e) {
      if (highed.isFn(icon.click)) {
        icon.click(e);
      }
    });

    i.title = icon.tooltip;

    highed.dom.ap(where === 'left' ? left : right, i);
  }

  function addSeparator(where) {
    highed.dom.ap(
      where === 'left' ? left : right,
      highed.dom.cr('span', 'separator')
    );
  }

  ///////////////////////////////////////////////////////////////////////////

  highed.dom.ap(parent, highed.dom.ap(container, left, center, right));

  ///////////////////////////////////////////////////////////////////////////

  return {
    /** The toolbar container
         *  @type {domnode}
         *  @memberof highed.Toolbar
         */
    container: container,
    addIcon: addIcon,
    addButton: addButton,
    addSeparator: addSeparator,
    /** The left part of the toolbar
         *  @type {domnode}
         *  @memberof highed.Toolbar
         */
    left: left,
    /** The center part of the toolbar
         *  @type {domnode}
         *  @memberof highed.Toolbar
         */
    center: center,
    /** The right part of the toolbar
         *  @type {domnode}
         *  @memberof highed.Toolbar
         */
    right: right
  };
};
