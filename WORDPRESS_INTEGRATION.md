# WordPress Headless CMS Integration - Next Steps

This document outlines the complete process for connecting your TanStack Start frontend to WordPress as a headless CMS.

---

## 📋 Overview

Your frontend is now ready to consume content from WordPress. The following steps need to be completed on the WordPress side to make the integration work:

1. ✅ Frontend integration (completed)
2. ⏳ WordPress configuration
3. ⏳ Content migration
4. ⏳ Testing & validation

---

## 🗄️ WordPress Setup

### Step 1: Install Required Plugins

Install and activate the following plugins on your WordPress site:

#### Essential Plugins:
1. **Custom Post Type UI** (free)
   - URL: https://wordpress.org/plugins/custom-post-type-ui/
   - Purpose: Create custom post types (Books, Events, Press only)
   - Note: Not needed for articles - use WordPress built-in Posts

2. **Advanced Custom Fields (ACF)** (free or Pro)
   - URL: https://www.advancedcustomfields.com/
   - Purpose: Add custom fields to your content types
   - Note: Free version is sufficient for this project

3. **CORS API Support** (optional but recommended)
   - URL: https://wordpress.org/plugins/wp-cors-api/
   - Purpose: Enable cross-origin requests from your frontend

---

### Step 2: Content Type Overview

Your site uses 4 content types:

| Content Type | WordPress Type | API Endpoint |
|---------------|----------------|--------------|
| Articles/Blog (Artigos/Blog) | Built-in Posts | `/posts` |
| Books (Livros) | Custom Post Type | `/books` |
| Events (Eventos) | Custom Post Type | `/events` |
| Press (Imprensa) | Custom Post Type | `/press` |

**Note:** Articles use WordPress built-in **Posts** - no CPT needed! Just create regular blog posts.

---

## 🇵🇹 Tipos de Conteúdo em Português

O site utiliza 4 tipos de conteúdo em WordPress:

| Tipo de Conteúdo | Tipo WordPress | Endpoint API |
|------------------|----------------|--------------|
| Artigos/Blog | Posts nativos | `/posts` |
| Livros | Custom Post Type | `/books` |
| Eventos | Custom Post Type | `/events` |
| Imprensa | Custom Post Type | `/press` |

**Nota:** Artigos utilizam os **Posts** nativos do WordPress - não é necessário CPT! Basta criar posts de blog normais.

---

### Step 3: Create Custom Post Types

Navigate to **CPT UI → Add/Edit Post Types** in WordPress admin.

#### 1. Books (Livros)

**Settings:**
- **Post Type Slug**: `books`
- **Plural Label**: Livros (or Books)
- **Singular Label**: Livro (or Book)
- **Public**: True
- **Publicly Queryable**: True
- **Show UI**: True
- **Show in REST API**: True
- **REST API Base**: `books`
- **Has Archive**: False
- **Supports**:
  - ✅ Title
  - ✅ Featured Image
  - ✅ Editor (for extended content)

**Taxonomies:**
- None required (use ACF fields instead)

---

#### 3. Events (Eventos)

**Settings:**
- **Post Type Slug**: `events`
- **Plural Label**: Eventos (or Events)
- **Singular Label**: Evento (or Event)
- **Public**: True
- **Publicly Queryable**: True
- **Show UI**: True
- **Show in REST API**: True
- **REST API Base**: `events`
- **Has Archive**: False
- **Supports**:
  - ✅ Title
  - ✅ Featured Image
  - ✅ Editor

**Taxonomies:**
- None required (use ACF fields instead)

---

#### 4. Press (Imprensa)

**Settings:**
- **Post Type Slug**: `press`
- **Plural Label**: Imprensa (or Press)
- **Singular Label**: Item de Imprensa (or Press Item)
- **Public**: True
- **Publicly Queryable**: True
- **Show UI**: True
- **Show in REST API**: True
- **REST API Base**: `press`
- **Has Archive**: False
- **Supports**:
  - ✅ Title
  - ✅ Editor (for excerpt)

**Taxonomies:**
- None required

---

### Step 3: Configure ACF Fields

Navigate to **Custom Fields → Add New** in WordPress admin.

#### Field Group 1: Book Details (Detalhes do Livro)

**Location:**
- Post type → Books

**Fields:**

| Field Name (Label) | Field Type | Field Key | Instructions (Instruções) | Required |
|------------|------------|-----------|--------------|-----------|
| Year (Ano) | Text | `field_year` | Publication year (e.g., 2024) | Yes |
| Genre (Género) | Text | `field_genre` | Literary genre (e.g., Poesia, Contos) | Yes |
| Author (Autor) | Text | `field_author` | Author name (defaults to "Eduardo Quive") | No |
| Publisher (Editora) | Text | `field_publisher` | Publisher name | No |
| Description (Descrição) | Textarea | `field_description` | Book description | Yes |
| Availability (Disponibilidade) | Text | `field_availability` | Where to buy (e.g., "Disponível nas livrarias") | No |
| Full Title (Título Completo) | Text | `field_full_title` | Complete title if subtitle exists | No |
| Buying Info (Informações de Compra) | Repeater | `field_buying_info` | List of purchase options | No |

**Buying Info Repeater Subfields:**
| Field Name (Label) | Field Type |
|------------|------------|
| Link Label (Etiqueta do Link) | Text |

---

#### Field Group 2: Event Details (Detalhes do Evento)

**Location:**
- Post type → Events

**Fields:**

| Field Name (Label) | Field Type | Field Key | Instructions (Instruções) | Required |
|------------|------------|-----------|--------------|-----------|
| Location (Local) | Text | `field_location` | Event location (e.g., "Maputo, Moçambique") | Yes |
| Date (Data) | Date Picker | `field_date` | Event date | Yes |
| Description (Descrição) | Textarea | `field_description` | Event description | Yes |
| Type (Tipo) | Select | `field_type` | Event type | Yes |

**Type Field Choices (Opções de Tipo):**
- `upcoming` : Próximos (Upcoming)
- `past` : Passados (Past)

---

#### Field Group 3: Press Details (Detalhes de Imprensa)

**Location:**
- Post type → Press

**Fields:**

| Field Name (Label) | Field Type | Field Key | Instructions (Instruções) | Required |
|------------|------------|-----------|--------------|-----------|
| Publication (Publicação) | Text | `field_publication` | Publication name (e.g., "O País") | Yes |
| Date (Data) | Date Picker | `field_date` | Publication date | Yes |
| URL | URL | `field_url` | Link to the article | Yes |
| Excerpt (Resumo) | Textarea | `field_excerpt` | Brief excerpt | Yes |

---

#### Field Group 4: Biography (Biografia)

**Location:**
- Page → Page Template → Biografia

**Fields:**

| Field Name (Label) | Field Type | Field Key | Instructions (Instruções) | Required |
|------------|------------|-----------|--------------|-----------|
| Career Section (Secção de Carreira) | WYSIWYG | `field_career_section` | Journalism and career content | Yes |
| Publications Section (Secção de Publicações) | WYSIWYG | `field_publications_section` | Literary publications | Yes |
| Residencies Section (Secção de Residências) | WYSIWYG | `field_residencies_section` | Residencies and programs | Yes |
| Videos (Vídeos) | Repeater | `field_videos` | YouTube videos | No |

**Videos Repeater Subfields (Subcampos de Vídeos):**
| Field Name (Label) | Field Type | Instructions (Instruções) |
|------------|------------|--------------|
| YouTube ID | Text | YouTube video ID (e.g., KoAv9QNt6wA from https://www.youtube.com/watch?v=KoAv9QNt6wA) |
| Title (Título) | Text | Video title |

---

### Step 4: Create the Biography Page

1. Navigate to **Pages → Add New**
2. Title: `Biografia`
3. Slug: `biografia`
4. Content: Leave empty (all content in ACF fields)
5. Publish

---

## 🔧 Frontend Configuration

### Step 1: Create Environment File

In your frontend project root:

```bash
cp .env.example .env
```

### Step 2: Configure WordPress URLs

Edit `.env` with your WordPress site details:

```env
# WordPress URL (site root or REST API URL)
VITE_WP_URL=https://your-wordpress-site.com

# WordPress Application Password (Basic Auth)
VITE_WP_USER=your_username
VITE_WP_APP_PASSWORD=your_app_password
```

**Important:**
- Replace `your-wordpress-site.com` with your actual WordPress domain
- If WordPress is on localhost, use: `http://localhost:8888` (adjust port as needed)
- If using HTTPS, ensure SSL certificate is valid
- If you use an Application Password, keep spaces as shown or remove them; the frontend will strip spaces automatically

---

## 📦 Content Migration

### Step 1: Migrate Articles (Migrar Artigos - Usar Posts do WordPress)

For each article in your hardcoded data (`src/constants/blogData.ts`):

1. Navigate to **Posts → Adicionar Novo** in WordPress
2. Enter title (inserir título)
3. Add content in editor (adicionar conteúdo no editor)
4. Set featured image (definir imagem destacada)
5. Select category (selecionar categoria)
6. Set publish date (definir data de publicação)
7. Publish (publicar)

**Mapeamento de Conteúdo (Content Mapping):**
- `title` → Post Title (Título do Post)
- `image` → Featured Image (Imagem Destacada)
- `author` → (use default, set via WP user) - (usar padrão, definir via utilizador WP)
- `date` → Publish Date (Data de Publicação)
- `readTime` → (auto-calculated from word count) - (calculado automaticamente pelo número de palavras)
- `category` → Category (Categoria)
- `content` → Post Content (Conteúdo do Post)

**Nota:** Use WordPress built-in Posts for articles - no custom post type needed! (Utilize os Posts nativos do WordPress para artigos - não é necessário custom post type!)

---

### Step 2: Migrate Books (Migrar Livros)

For each book in your hardcoded data:

1. Navigate to **Books → Adicionar Novo** in WordPress
2. Enter title (inserir título)
3. Upload book cover as featured image (carregar capa do livro como imagem destacada)
4. Fill in ACF fields (preencher campos ACF):
   - Year (Ano)
   - Genre (Género)
   - Author (Autor)
   - Publisher (Editora)
   - Description (Descrição)
   - Availability (Disponibilidade)
   - Full Title (Título Completo) (se aplicável)
   - Buying Info (Informações de Compra) (se aplicável)
5. Publish (publicar)

**Exemplo (Example):**
```
Title (Título): Mutiladas
Year (Ano): 2023
Genre (Género): Contos
Author (Autor): Eduardo Quive
Publisher (Editora): Catalogus
Description (Descrição): [paste full description]
Availability (Disponibilidade): Disponível nas livrarias em Maputo.
Buying Info (Informações de Compra):
  - Livraria Mabuku (Maputo | Matola)
  - Livraria Sequoia (Sommershield)
  - Livraria Ethale Publishing
  - info@catalogus.co.mz
```

---

### Step 3: Migrate Events (Migrar Eventos)

For each event:

1. Navigate to **Events → Adicionar Novo** in WordPress
2. Enter title (inserir título)
3. Add featured image (optional) (adicionar imagem destacada - opcional)
4. Fill in ACF fields (preencher campos ACF):
   - Location (Local)
   - Date (Data)
   - Description (Descrição)
   - Type (Tipo) - upcoming ou past
5. Publish (publicar)

**Importante (Important):**
- Set Type correctly based on whether the event is in the past or future (definir Tipo corretamente com base se o evento está no passado ou futuro)
- The frontend automatically sorts events (upcoming first, then past) (o frontend ordena automaticamente os eventos - próximos primeiro, depois passados)

---

### Step 4: Migrate Press Items (Migrar Itens de Imprensa)

For each press item:

1. Navigate to **Press → Adicionar Novo** in WordPress
2. Enter title (inserir título)
3. Fill in ACF fields (preencher campos ACF):
   - Publication (Publicação)
   - Date (Data)
   - URL
   - Excerpt (Resumo)
4. Publish (publicar)

**Exemplo (Example):**
```
Title (Título): Eduardo Quive e a reinvenção da narrativa moçambicana contemporânea
Publication (Publicação): O País
Date (Data): 2025-03-12
URL: https://o-pais.mz/article-link
Excerpt (Resumo): Uma conversa profunda sobre as raízes culturais e o futuro da literatura nos países lusófonos.
```

---

### Step 5: Configure Biography (Configurar Biografia)

1. Navigate to **Páginas → Biografia**
2. Edit the page (editar a página)
3. Fill in ACF fields (preencher campos ACF):
   - **Career Section (Secção de Carreira)**: Paste journalism/career content (colar conteúdo de jornalismo/carreira)
   - **Publications Section (Secção de Publicações)**: Paste publications content (colar conteúdo de publicações)
   - **Residencies Section (Secção de Residências)**: Paste residencies content (colar conteúdo de residências)
   - **Videos (Vídeos)**: Add YouTube videos (adicionar vídeos YouTube)
     - YouTube ID: `KoAv9QNt6wA`
     - Title (Título): `Eduardo Quive Video 1`
4. Update (atualizar)

**Fontes de Conteúdo (Content Sources):**
- Current content is in `biografia.tsx` and `src/components/home/LiteratureReveal.tsx` (o conteúdo atual está em)
- Extract text and paste into appropriate WYSIWYG fields (extrair texto e colar nos campos WYSIWYG apropriados)

---

## 🧪 Testing & Validation

### Step 1: Verify WordPress API Endpoints

Test each endpoint in your browser:

1. **Articles (Posts)**:
   ```
   https://your-wordpress-site.com/wp-json/wp/v2/posts?_embed=wp:term,wp:featuredmedia,author
   ```

2. **Books**:
   ```
   https://your-wordpress-site.com/wp-json/wp/v2/books?_embed=wp:featuredmedia
   ```

3. **Events**:
   ```
   https://your-wordpress-site.com/wp-json/wp/v2/events?_embed=wp:featuredmedia
   ```

4. **Press**:
   ```
   https://your-wordpress-site.com/wp-json/wp/v2/press
   ```

5. **Biography Page**:
   ```
   https://your-wordpress-site.com/wp-json/wp/v2/pages?slug=biografia&_embed=wp:featuredmedia
   ```

**Expected Results:**
- JSON array with your content
- `_embedded` field containing media and taxonomies
- ACF fields in the `acf` object (for custom content)

---

### Step 2: Test Frontend Locally

Start your development server:

```bash
pnpm dev
```

Open your browser to `http://localhost:3000` and verify:

- ✅ Home page loads without errors
- ✅ Articles carousel shows WordPress content
- ✅ Books grid displays all books
- ✅ Events timeline shows upcoming and past events
- ✅ Press list displays press items
- ✅ Biography preview shows career section

Test individual pages:

- ✅ Click on an article → `/blog/slug` page loads
- ✅ Click on "Leia Mais" in biography → `/biografia` page loads
- ✅ All images load correctly from WordPress
- ✅ No console errors

---

### Step 3: Debug Common Issues

#### Issue 1: CORS Errors

**Symptom:**
```
Access to fetch at 'https://your-wordpress-site.com/wp-json/wp/v2/articles' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution:**
1. Install and activate CORS API plugin
2. Or add to WordPress `functions.php`:
   ```php
   add_action( 'rest_api_init', function () {
     remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
     add_filter( 'rest_pre_serve_request', function( $value ) {
       header( 'Access-Control-Allow-Origin: *' );
       header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
       header( 'Access-Control-Allow-Headers: Authorization, Content-Type' );
       return $value;
     });
   } );
   ```

#### Issue 2: 404 Not Found

**Symptom:**
```json
{"code":"rest_no_route","message":"No route was found matching the URL and request method","data":{"status":404}}
```

**Solution:**
- Verify custom post types have "Show in REST API" enabled
- Check REST API Base slug matches (e.g., `articles`, not `article`)
- Flush rewrite rules: navigate to **Settings → Permalinks** and click Save

#### Issue 3: ACF Fields Not Showing

**Symptom:**
API response doesn't include `acf` object

**Solution:**
1. Ensure ACF fields are published
2. Check field group location rules match post type
3. For older ACF versions: In ACF Settings, enable "Show in REST API"

---

## 🚀 Deployment Checklist

### Frontend Deployment

1. **Set Production Environment Variables**:
   ```env
   VITE_WP_URL=https://your-production-wordpress.com
   ```

2. **Build for Production**:
   ```bash
   pnpm build
   ```

3. **Deploy**:
   - Vercel, Netlify, or your hosting platform
   - Ensure environment variables are set in deployment settings

### WordPress Configuration

1. **Security**:
   - Install SSL certificate
   - Use strong passwords
   - Install security plugins (Wordfence, etc.)

2. **Performance**:
   - Install caching plugin (WP Rocket, W3 Total Cache)
   - Enable image optimization
   - Configure CDN for media files

3. **CORS for Production**:
   - Whitelist your production domain in CORS settings
   - Example: Allow `https://your-frontend-domain.com`

---

## 📚 Additional Resources

### Documentation:
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [ACF Documentation](https://www.advancedcustomfields.com/resources/)
- [CPT UI Documentation](https://github.com/WebDevStudios/custom-post-type-ui/wiki)

### Tools:
- [REST API Console](https://developer.wordpress.org/rest-api/interactive-console/)
- [JSON Formatter](https://jsonformatter.curiousconcept.com/)

---

## ✅ Integration Complete Checklist

- [ ] WordPress installed with required plugins
- [ ] Custom post types created (Books, Events, Press only)
- [ ] ACF field groups configured
- [ ] Biography page created with ACF fields
- [ ] Frontend `.env` configured with WordPress URLs
- [ ] Content migrated from hardcoded arrays to WordPress
- [ ] API endpoints verified (return expected JSON)
- [ ] Frontend tested locally with WordPress data
- [ ] CORS issues resolved (if any)
- [ ] Images loading correctly from WordPress
- [ ] All pages functional (home, blog, biografia)
- [ ] Build successful without errors
- [ ] Production environment configured
- [ ] Deployed to production

---

## 🆘 Troubleshooting (Solução de Problemas)

If you encounter issues (Se encontrar problemas):

1. **Check browser console** for JavaScript errors (verificar consola do browser para erros JavaScript)
2. **Check Network tab** in DevTools for failed API requests (verificar aba Network no DevTools para pedidos de API falhados)
3. **Verify WordPress API** is accessible (verificar se a API WordPress está acessível)
4. **Check environment variables** are set correctly (verificar se as variáveis de ambiente estão definidas corretamente)
5. **Clear caches** (WordPress cache, browser cache, build cache) (limpar caches)

---

## 📞 Need Help? (Precisa de Ajuda?)

If you need assistance with any step (Se precisar de ajuda com qualquer passo):

1. Review this document carefully (rever este documento cuidadosamente)
2. Check WordPress and frontend logs (verificar logs WordPress e frontend)
3. Test API endpoints independently (testar endpoints API independentemente)
4. Refer to plugin documentation (consultar documentação dos plugins)

Good luck with your WordPress headless integration! 🎉 (Boa sorte com a integração WordPress headless!)

---

## 📚 Referência Completa de Tipos de Conteúdo (Português)

### 1. Artigos (Articles/Blog)

**Tipo:** Posts nativos do WordPress  
**Endpoint:** `/posts`  
**Sem necessidade de Custom Post Type!**

**Campos Disponíveis:**
- Título (Title)
- Conteúdo (Content) - editor WYSIWYG
- Imagem Destacada (Featured Image)
- Categoria (Category)
- Data de Publicação (Publish Date)
- Autor (Author) - via utilizador WordPress

**Como Criar:**
1. Ir para **Posts → Adicionar Novo**
2. Preencher título e conteúdo
3. Adicionar imagem destacada
4. Selecionar categoria
5. Definir data
6. Publicar

---

### 2. Livros (Books)

**Tipo:** Custom Post Type  
**Endpoint:** `/books`

**Campos ACF:**
- **Ano (Year)** - Texto - Ano de publicação
- **Género (Genre)** - Texto - Género literário (ex: Poesia, Contos)
- **Autor (Author)** - Texto - Nome do autor (padrão: "Eduardo Quive")
- **Editora (Publisher)** - Texto - Nome da editora
- **Descrição (Description)** - Textarea - Descrição do livro
- **Disponibilidade (Availability)** - Texto - Onde comprar (ex: "Disponível nas livrarias")
- **Título Completo (Full Title)** - Texto - Título completo se houver subtítulo (opcional)
- **Informações de Compra (Buying Info)** - Repeater - Lista de opções de compra (opcional)

**Como Criar:**
1. Ir para **Livros → Adicionar Novo**
2. Inserir título
3. Carregar capa do livro como imagem destacada
4. Preencher campos ACF
5. Publicar

---

### 3. Eventos (Events)

**Tipo:** Custom Post Type  
**Endpoint:** `/events`

**Campos ACF:**
- **Local (Location)** - Texto - Local do evento (ex: "Maputo, Moçambique")
- **Data (Date)** - Date Picker - Data do evento
- **Descrição (Description)** - Textarea - Descrição do evento
- **Tipo (Type)** - Select - Tipo do evento:
  - `upcoming` (Próximos)
  - `past` (Passados)

**Como Criar:**
1. Ir para **Eventos → Adicionar Novo**
2. Inserir título
3. Adicionar imagem destacada (opcional)
4. Preencher campos ACF
5. Definir Tipo corretamente (próximo ou passado)
6. Publicar

---

### 4. Imprensa (Press)

**Tipo:** Custom Post Type  
**Endpoint:** `/press`

**Campos ACF:**
- **Publicação (Publication)** - Texto - Nome da publicação (ex: "O País")
- **Data (Date)** - Date Picker - Data de publicação
- **URL** - URL - Link para o artigo
- **Resumo (Excerpt)** - Textarea - Resumo breve

**Como Criar:**
1. Ir para **Imprensa → Adicionar Novo**
2. Inserir título
3. Preencher campos ACF
4. Publicar

---

### 5. Biografia (Biography Page)

**Tipo:** Página do WordPress  
**Endpoint:** `/pages?slug=biografia`

**Campos ACF:**
- **Secção de Carreira (Career Section)** - WYSIWYG - Conteúdo de jornalismo e carreira
- **Secção de Publicações (Publications Section)** - WYSIWYG - Publicações literárias
- **Secção de Residências (Residencies Section)** - WYSIWYG - Residências e programas
- **Vídeos (Videos)** - Repeater - Vídeos YouTube:
  - YouTube ID - Texto - ID do vídeo YouTube
  - Título (Title) - Texto - Título do vídeo

**Como Criar:**
1. Criar página com slug `biografia`
2. Editar página
3. Preencher campos ACF
4. Adicionar vídeos no campo Vídeos
5. Atualizar

---

## 🎯 Resumo Rápido (Quick Summary)

| Tipo de Conteúdo | WP Type | Endpoint | CPT Necessário? | ACF Necessário? |
|------------------|---------|-----------|-----------------|-----------------|
| Artigos (Articles) | Posts | `/posts` | ❌ Não | ❌ Não |
| Livros (Books) | CPT | `/books` | ✅ Sim | ✅ Sim |
| Eventos (Events) | CPT | `/events` | ✅ Sim | ✅ Sim |
| Imprensa (Press) | CPT | `/press` | ✅ Sim | ✅ Sim |
| Biografia (Biography) | Page | `/pages` | ❌ Não | ✅ Sim |
