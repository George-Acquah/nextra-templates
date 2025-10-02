import fs from 'fs-extra'
import path from 'path'

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates')
const ROOT_DIR = path.join(__dirname, '..')

export async function exportTemplate(templateName: string, targetDir: string) {
  const sourceDir = path.join(TEMPLATES_DIR, templateName)
  const finalDir = path.resolve(targetDir)

  // 1. Copy the base template
  await fs.copy(sourceDir, finalDir)
  console.log(`📁 Copied ${templateName} to ${finalDir}`)

  // 2. Add root shared files
  const sharedFiles = [
    '.prettierrc',
    '.eslintrc.json',
    'tailwind.config.js',
    'postcss.config.js',
  ]
  for (const file of sharedFiles) {
    const from = path.join(ROOT_DIR, file)
    const to = path.join(finalDir, file)
    if (await fs.pathExists(from)) {
      await fs.copy(from, to)
    }
  }

  // 3. Merge tsconfig
  const rootTsConfig = await fs.readJSON(path.join(ROOT_DIR, 'tsconfig.json'))
  const templateTsConfigPath = path.join(finalDir, 'tsconfig.json')
  const templateTsConfig = await fs.readJSON(templateTsConfigPath)

  const mergedTsConfig = {
    ...rootTsConfig,
    ...templateTsConfig,
    compilerOptions: {
      ...rootTsConfig.compilerOptions,
      ...templateTsConfig.compilerOptions,
    },
  }
  await fs.writeJSON(templateTsConfigPath, mergedTsConfig, { spaces: 2 })

  // 4. Merge package.json with root devDeps
  const rootPkg = await fs.readJSON(path.join(ROOT_DIR, 'package.json'))
  const templatePkgPath = path.join(finalDir, 'package.json')
  const templatePkg = await fs.readJSON(templatePkgPath)

  const finalPkg = {
    ...templatePkg,
    devDependencies: {
      ...templatePkg.devDependencies,
      ...rootPkg.devDependencies,
    },
  }
  await fs.writeJSON(templatePkgPath, finalPkg, { spaces: 2 })

  // 5. Clean up workspace fields if any
  delete finalPkg.workspaces

  console.log('✅ Template exported successfully.')
}
