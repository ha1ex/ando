import { Helmet } from "react-helmet-async";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  old_price?: number;
  image_url?: string;
  slug: string;
  article?: string;
  is_available: boolean;
}

interface SchemaOrgProps {
  type: 'organization' | 'product' | 'breadcrumb';
  data?: any;
}

const SchemaOrg = ({ type, data }: SchemaOrgProps) => {
  const getSchema = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "ANDO JV",
          "alternateName": "ANDO",
          "url": "https://yourdomain.com",
          "logo": "https://yourdomain.com/logo.png",
          "description": "Российский бренд современной минималистичной одежды. Качественные вещи вне времени и трендов.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Невский пр., 148, пом 3-н",
            "addressLocality": "Санкт-Петербург",
            "postalCode": "191025",
            "addressCountry": "RU"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+7-966-753-31-48",
            "contactType": "customer service",
            "email": "info@andojv.ru",
            "areaServed": "RU",
            "availableLanguage": "Russian"
          },
          "sameAs": [
            "https://instagram.com/andojv"
          ]
        };

      case 'product':
        if (!data) return null;
        const product = data as Product;
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.name,
          "description": product.description || `${product.name} от ANDO JV`,
          "image": product.image_url,
          "sku": product.article || product.id,
          "brand": {
            "@type": "Brand",
            "name": "ANDO JV"
          },
          "offers": {
            "@type": "Offer",
            "url": `https://yourdomain.com/product/${product.slug}`,
            "priceCurrency": "RUB",
            "price": product.price,
            "availability": product.is_available 
              ? "https://schema.org/InStock" 
              : "https://schema.org/OutOfStock",
            "seller": {
              "@type": "Organization",
              "name": "ANDO JV"
            }
          },
          ...(product.old_price && {
            "aggregateRating": {
              "@type": "AggregateOffer",
              "lowPrice": product.price,
              "highPrice": product.old_price,
              "priceCurrency": "RUB"
            }
          })
        };

      case 'breadcrumb':
        if (!data?.items) return null;
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.items.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        };

      default:
        return null;
    }
  };

  const schema = getSchema();
  
  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default SchemaOrg;
