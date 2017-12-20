import { expect } from 'chai';
import { Asset } from '../asset';
import * as path from "path";
import { ModuleMetadataRegister } from '../module-metadata.register';

describe('ModuleMetadataRegister', () => {
  let register: ModuleMetadataRegister;
  beforeEach(() => register = new ModuleMetadataRegister());
  describe('#register()', () => {
    it('should create controller metadata with the new controller', () => {
      const asset: Asset = {
        className: 'NameController',
        type: 'controller',
        name: 'name',
        directory: path.join(process.cwd(), 'src/modules', 'name'),
        filename: 'name.controller.ts',
        template: {
          name: '',
          content: 'content'
        }
      };
      const module: Asset = {
        type: 'module',
        name: 'name',
        directory: path.join(process.cwd(), 'src/modules', 'name'),
        filename: 'name.module.ts',
        template: {
          content:
          'import { Module } from \'@nestjs/common\';\n' +
          '\n' +
          '@Module({})\n' +
          'export class NameModule {}\n'
        }
      };
      expect(register.register(asset, module)).to.be.deep.equal({
        type: 'module',
        name: 'name',
        directory: path.join(process.cwd(), 'src/modules', 'name'),
        filename: 'name.module.ts',
        template: {
          content:
          'import { Module } from \'@nestjs/common\';\n\n' +
          `@Module(${ JSON.stringify({
            controllers: [ 'NameController' ]
          }, null, 2).replace(/"/g, '')})\n` +
          'export class NameModule {}\n'
        }
      });
    });
  });
});
