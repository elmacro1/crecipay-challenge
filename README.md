# CreciPay Challenge

Este es un proyecto desarrollado con Next.js que implementa un sistema de comisiones para representantes de ventas.
Decidí usar Supabase como servicio de base de datos por su simplesa y rapidez. Si bien el proyecto se puede adaptar a servicios como AWS o GCP.

## Requisitos

- Node.js 18 o superior
- Supabase cuenta

## Configuración del Proyecto

1. Clona el repositorio
2. Instala las dependencias:

```bash
npm install
# o
yarn install
```

3. Configura las variables de entorno:
   Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://enjrluulecowgvruhpcy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuanJsdXVsZWNvd2d2cnVocGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5ODY2NTksImV4cCI6MjA1OTU2MjY1OX0.NilVKt-_Jq_wVv9gYapghHD1MXW_2giCLQeeIGdq4LU
```

## Estructura del Proyecto

- `/app`: Páginas y rutas de la aplicación
- `/app/api`: Endpoints para poder manipular los datos
- `/components`: Componentes reutilizables
- `/types`: Tipos TypeScript
- `/utils`: Funciones utilitarias

## Funcionalidades

- Sistema de comisiones para representantes de ventas
- Carga masiva de datos a través de archivo CSV
- Filtros por representante y mes
- Tabla de comisiones con información detallada

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:3000`.

### Nota Importante

Hice el siguiente cambio antes de subir ya que tiraba error si no se borraba los datos de la tabla:

Antes:

```bash
const { error } = await supabase.from("commissions").insert(results);
```

Despues:

```bash
const { error } = await supabase.from("commissions").upsert(results);
```

## Tecnologías Utilizadas

- Next.js 15+
- Supabase
- Tailwind CSS
- TypeScript
