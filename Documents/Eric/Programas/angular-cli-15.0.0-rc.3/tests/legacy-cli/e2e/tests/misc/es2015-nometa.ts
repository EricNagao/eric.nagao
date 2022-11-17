import { prependToFile, replaceInFile } from '../../utils/fs';
import { ng } from '../../utils/process';

export default async function () {
  await ng('generate', 'service', 'user');

  // Update the application to use the new service
  await prependToFile('src/app/app.component.ts', "import { UserService } from './user.service';");

  await replaceInFile(
    'src/app/app.component.ts',
    'export class AppComponent {',
    'export class AppComponent {\n  constructor(user: UserService) {}',
  );

  // Execute the application's tests with emitDecoratorMetadata disabled (default)
  await ng('test', '--no-watch');
}
