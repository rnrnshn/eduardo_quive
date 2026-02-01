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
| Articles/Blog | Built-in Posts | `/posts` |
| Books | Custom Post Type | `/books` |
| Events | Custom Post Type | `/events` |
| Press | Custom Post Type | `/press` |

**Note:** Articles use WordPress built-in **Posts** - no CPT needed! Just create regular blog posts.

---

### Step 3: Create Custom Post Types

Navigate to **CPT UI → Add/Edit Post Types** in WordPress admin.

#### 1. Books

**Settings:**
- **Post Type Slug**: `books`
- **Plural Label**: Books
- **Singular Label**: Book
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

#### 3. Events

**Settings:**
- **Post Type Slug**: `events`
- **Plural Label**: Events
- **Singular Label**: Event
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

#### 4. Press

**Settings:**
- **Post Type Slug**: `press`
- **Plural Label**: Press
- **Singular Label**: Press Item
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

#### Field Group 1: Book Details

**Location:**
- Post type → Books

**Fields:**

| Field Name | Field Type | Field Key | Instructions | Required |
|------------|------------|-----------|--------------|-----------|
| Year | Text | `field_year` | Publication year (e.g., 2024) | Yes |
| Genre | Text | `field_genre` | Literary genre (e.g., Poesia, Contos) | Yes |
| Author | Text | `field_author` | Author name (defaults to "Eduardo Quive") | No |
| Publisher | Text | `field_publisher` | Publisher name | No |
| Description | Textarea | `field_description` | Book description | Yes |
| Availability | Text | `field_availability` | Where to buy (e.g., "Disponível nas livrarias") | No |
| Full Title | Text | `field_full_title` | Complete title if subtitle exists | No |
| Buying Info | Repeater | `field_buying_info` | List of purchase options | No |

**Buying Info Repeater Subfields:**
| Field Name | Field Type |
|------------|------------|
| Link Label | Text |

---

#### Field Group 2: Event Details

**Location:**
- Post type → Events

**Fields:**

| Field Name | Field Type | Field Key | Instructions | Required |
|------------|------------|-----------|--------------|-----------|
| Location | Text | `field_location` | Event location (e.g., "Maputo, Moçambique") | Yes |
| Date | Date Picker | `field_date` | Event date | Yes |
| Description | Textarea | `field_description` | Event description | Yes |
| Type | Select | `field_type` | Event type | Yes |

**Type Field Choices:**
- `upcoming` : Upcoming
- `past` : Past

---

#### Field Group 3: Press Details

**Location:**
- Post type → Press

**Fields:**

| Field Name | Field Type | Field Key | Instructions | Required |
|------------|------------|-----------|--------------|-----------|
| Publication | Text | `field_publication` | Publication name (e.g., "O País") | Yes |
| Date | Date Picker | `field_date` | Publication date | Yes |
| URL | URL | `field_url` | Link to the article | Yes |
| Excerpt | Textarea | `field_excerpt` | Brief excerpt | Yes |

---

#### Field Group 4: Biography

**Location:**
- Page → Page Template → Biografia

**Fields:**

| Field Name | Field Type | Field Key | Instructions | Required |
|------------|------------|-----------|--------------|-----------|
| Career Section | WYSIWYG | `field_career_section` | Journalism and career content | Yes |
| Publications Section | WYSIWYG | `field_publications_section` | Literary publications | Yes |
| Residencies Section | WYSIWYG | `field_residencies_section` | Residencies and programs | Yes |
| Videos | Repeater | `field_videos` | YouTube videos | No |

**Videos Repeater Subfields:**
| Field Name | Field Type | Instructions |
|------------|------------|--------------|
| YouTube ID | Text | YouTube video ID (e.g., KoAv9QNt6wA from https://www.youtube.com/watch?v=KoAv9QNt6wA) |
| Title | Text | Video title |

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
# WordPress REST API endpoint
VITE_WP_API_URL=https://your-wordpress-site.com/wp-json/wp/v2

# WordPress site URL (for links and absolute URLs)
VITE_WP_SITE_URL=https://your-wordpress-site.com
```

**Important:**
- Replace `your-wordpress-site.com` with your actual WordPress domain
- If WordPress is on localhost, use: `http://localhost:8888/wp-json/wp/v2` (adjust port as needed)
- If using HTTPS, ensure SSL certificate is valid

---

## 📦 Content Migration

### Step 1: Migrate Articles (Use WordPress Posts)

For each article in your hardcoded data (`src/constants/blogData.ts`):

1. Navigate to **Posts → Add New** in WordPress
2. Enter title
3. Add content in editor
4. Set featured image
5. Select category
6. Set publish date
7. Publish

**Content Mapping:**
- `title` → Post Title
- `image` → Featured Image
- `author` → (use default, set via WP user)
- `date` → Publish Date
- `readTime` → (auto-calculated from word count)
- `category` → Category
- `content` → Post Content

**Note:** Use WordPress built-in Posts for articles - no custom post type needed!

---

### Step 2: Migrate Books

For each book in your hardcoded data:

1. Navigate to **Books → Add New** in WordPress
2. Enter title
3. Upload book cover as featured image
4. Fill in ACF fields:
   - Year
   - Genre
   - Author
   - Publisher
   - Description
   - Availability
   - Full Title (if applicable)
   - Buying Info (if applicable)
5. Publish

**Example:**
```
Title: Mutiladas
Year: 2023
Genre: Contos
Author: Eduardo Quive
Publisher: Catalogus
Description: [paste full description]
Availability: Disponível nas livrarias em Maputo.
Buying Info:
  - Livraria Mabuku (Maputo | Matola)
  - Livraria Sequoia (Sommershield)
  - Livraria Ethale Publishing
  - info@catalogus.co.mz
```

---

### Step 3: Migrate Events

For each event:

1. Navigate to **Events → Add New** in WordPress
2. Enter title
3. Add featured image (optional)
4. Fill in ACF fields:
   - Location
   - Date
   - Description
   - Type (upcoming or past)
5. Publish

**Important:**
- Set Type correctly based on whether the event is in the past or future
- The frontend automatically sorts events (upcoming first, then past)

---

### Step 4: Migrate Press Items

For each press item:

1. Navigate to **Press → Add New** in WordPress
2. Enter title
3. Fill in ACF fields:
   - Publication
   - Date
   - URL
   - Excerpt
4. Publish

**Example:**
```
Title: Eduardo Quive e a reinvenção da narrativa moçambicana contemporânea
Publication: O País
Date: 2025-03-12
URL: https://o-pais.mz/article-link
Excerpt: Uma conversa profunda sobre as raízes culturais e o futuro da literatura nos países lusófonos.
```

---

### Step 5: Configure Biography

1. Navigate to **Pages → Biografia**
2. Edit the page
3. Fill in ACF fields:
   - **Career Section**: Paste journalism/career content
   - **Publications Section**: Paste publications content
   - **Residencies Section**: Paste residencies content
   - **Videos**: Add YouTube videos
     - YouTube ID: `KoAv9QNt6wA`
     - Title: `Eduardo Quive Video 1`
4. Update

**Content Sources:**
- Current content is in `biografia.tsx` and `src/components/home/LiteratureReveal.tsx`
- Extract text and paste into appropriate WYSIWYG fields

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
   VITE_WP_API_URL=https://your-production-wordpress.com/wp-json/wp/v2
   VITE_WP_SITE_URL=https://your-production-wordpress.com
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

## 🆘 Troubleshooting

If you encounter issues:

1. **Check browser console** for JavaScript errors
2. **Check Network tab** in DevTools for failed API requests
3. **Verify WordPress API** is accessible
4. **Check environment variables** are set correctly
5. **Clear caches** (WordPress cache, browser cache, build cache)

---

## 📞 Need Help?

If you need assistance with any step:

1. Review this document carefully
2. Check WordPress and frontend logs
3. Test API endpoints independently
4. Refer to plugin documentation

Good luck with your WordPress headless integration! 🎉
