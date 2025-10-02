import fs from 'fs-extra'
import path from 'path'

const templatesDir = path.join(__dirname, '..', 'templates')

async function generateReadme(templateName: string) {
  const templatePath = path.join(templatesDir, templateName)

  const features: string[] = []

  if (templateName.includes('blog')) features.push('✅ Blog (MDX, RSS)')
  if (templateName.includes('theme')) features.push('✅ Light/Dark Theme')
  if (templateName.includes('shadcn')) features.push('✅ Shadcn UI')

  const readme = `# ${templateName}

This is the **${templateName}** template for Nextra CLI.

## Features

${features.length ? features.join('\n') : '🔸 Base Next.js project'}

## Getting Started

\`\`\`bash
pnpm install
pnpm dev
\`\`\`

`

  await fs.writeFile(path.join(templatePath, 'README.md'), readme)
}

async function run() {
  const templates = await fs.readdir(templatesDir)
  for (const template of templates) {
    const fullPath = path.join(templatesDir, template)
    const stat = await fs.stat(fullPath)
    if (stat.isDirectory()) {
      await generateReadme(template)
      console.log(`📄 Generated README for ${template}`)
    }
  }
}

run().catch(console.error)
