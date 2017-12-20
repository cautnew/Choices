import { expect } from 'chai';
import { stub } from 'sinon';
import WrappedElement from './wrapped-element';
import WrappedInput from './wrapped-input';
import { DEFAULT_CLASSNAMES, DEFAULT_CONFIG } from '../constants';

describe('components/wrappedInput', () => {
  let instance;
  let choicesInstance;
  let element;

  beforeEach(() => {
    choicesInstance = {
      config: {
        ...DEFAULT_CONFIG,
      },
    };
    element = document.createElement('input');
    instance = new WrappedInput(choicesInstance, element, DEFAULT_CLASSNAMES);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    instance = null;
  });

  describe('constructor', () => {
    it('assigns choices instance to class', () => {
      expect(instance.parentInstance).to.eql(choicesInstance);
    });

    it('assigns choices element to class', () => {
      expect(instance.element).to.eql(element);
    });

    it('assigns classnames to class', () => {
      expect(instance.classNames).to.eql(DEFAULT_CLASSNAMES);
    });
  });

  describe('inherited methods', () => {
    ['getElement', 'conceal', 'reveal', 'enable', 'disable'].forEach((method) => {
      describe(method, () => {
        beforeEach(() => {
          stub(WrappedElement.prototype, method);
        });

        afterEach(() => {
          WrappedElement.prototype[method].restore();
        });

        it(`calls super.${method}`, () => {
          expect(WrappedElement.prototype[method].called).to.equal(false);
          instance[method]();
          expect(WrappedElement.prototype[method].called).to.equal(true);
        });
      });
    });
  });

  describe('setValue', () => {
    const data = [
      {
        id: 'ID 1',
        value: 'Value 1',
      },
      {
        id: 'ID 2',
        value: 'Value 2',
      },
      {
        id: 'ID 3',
        value: 'Value 3',
      },
    ];

    it('sets delimited value of element based on passed data', () => {
      expect(instance.element.value).to.equal('');
      instance.setValue(data);
      expect(instance.element.value).to.equal('Value 1,Value 2,Value 3');
    });
  });
});
