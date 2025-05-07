create type user_role as enum ('overload', 'user');
create type user_in_store_role as enum ('admin', 'owver');

create type payment_gateway as enum ('asaas', 'pagarme');
create type shipment_option as enum ('melhorenvio');

create type product_type as enum (
    'color',
     'size',
     'size_shirt',
     'agender'
);

create type product_media_type as enum ('photo', 'video');
create type product_media_status as enum ('loading', 'uploaded', 'failed');

create type payment_status as enum (
    'waiting',
     'paid',
     'canceled',
     'refaunded',
     'chargeback',
     'released'
);

create type order_status as enum(
    'waiting',
    'paid',
    'canceled',
    'refunded',
    'cchargeback',
    'working',
    'shiped',
    'delivered',
    'could-not-delivered',
    'done'
);

create table categories (
    id uuid not null
          constraint pk_categories primary key default (gen_random_uuid()),

    name text      
);

alter table categories add column category_id uuid
     constraint fk_categories_parent references categories(id);

create table users (
    id uuid not null
          constraint pk_users primary key 
          default (gen_random_uuid()), 

    name text not null,
    email text not null constraint uq_users_email unique, 
    password text not null,
    role user_role not null
       constraint df_users_role default ('user'),

     utc_created_on timestamp not null 
         constraint df_users_utc_created_on default (now())       
);

create table stores (
    id uuid not null
          constraint pk_stores primary key 
          default (gen_random_uuid()), 

    name text not null,

    utc_created_on timestamp not null 
         constraint df_stores_utc_created_on default (now())
);

create table user_in_store (
    user_id uuid not null
       constraint fk_user_in_store_users
       references users(id),

    store_id  uuid not null
       constraint fk_user_in_store_stores
       references stores(id),  

    role user_in_store_role not null,

    constraint pk_user_in_store primary key (
        user_id,
        store_id
    )
);

create table store_payment_gateways (
    id uuid not null
          constraint pk_store_payment_gateways primary key 
          default (gen_random_uuid()), 

    store_id  uuid not null
       constraint fk_store_payment_gateways_stores
       references stores(id),  

    payment_gateway payment_gateway not null,
    name text not null,

    utc_created_on timestamp not null 
        constraint df_store_payment_gateways_utc_created_on 
        default (now())
);

create table store_shipment_options (
    id uuid not null
          constraint pk_store_shipment_options primary key 
          default (gen_random_uuid()),

    store_id  uuid not null
       constraint fk_store_shipment_options_stores
       references stores(id),    

    shipment_option shipment_option not null,
    name text not null,

    utc_created_on timestamp not null 
        constraint df_store_shipment_options_utc_created_on 
        default (now())
);

create table products (
    id uuid not null
          constraint pk_products primary key 
          default (gen_random_uuid()),

    store_id  uuid not null
       constraint fk_products_stores
       references stores(id), 

    category_id  uuid not null
       constraint fk_products_categories
       references categories(id), 

    came text not null,
    desctription text,

    utc_created_on timestamp not null 
        constraint df_products_utc_created_on 
        default (now())
);

create table product_options (
    id uuid not null
          constraint pk_product_options primary key 
          default (gen_random_uuid()),

    product_id  uuid not null
       constraint fk_product_options_products
       references products(id),    

    type product_type not null,
    inventory int not null,

    name text not null,
    description text,
    price int not null ,

    utc_created_on timestamp not null 
       constraint df_product_options_utc_created_on 
       default (now())   
);

create table product_media (
    id uuid not null
          constraint pk_product_media primary key 
          default (gen_random_uuid()),

    product_id  uuid not null
       constraint fk_product_media_products
       references products(id),

    product_option_id uuid not null
       constraint fk_product_media_product_options
       references product_options(id), 

    type product_media_type not null,
    status product_media_status not null,

    filepath text not null,
    cdn_key text not null,

   utc_created_on timestamp not null 
       constraint df_product_media_utc_created_on 
       default (now())      
);

create table customers (
   id uuid not null
          constraint pk_customers primary key 
          default (gen_random_uuid()), 

    store_id  uuid not null
       constraint fk_customers_stores
       references stores(id),

    email text not null constraint uq_customers_email unique,
    cpf text not null constraint uq_customers_cpf unique,
    password text not null,

    name text not null,
    phone text not null,
     
    utc_created_on timestamp not null 
       constraint df_customers_utc_created_on 
       default (now())         
);

create sequence seq_orders_order_number;
create table orders (
    id uuid not null
          constraint pk_orders primary key 
          default (gen_random_uuid()), 

    store_id  uuid not null
       constraint fk_orders_stores
       references stores(id),
    
    customer_id  uuid not null
       constraint fk_orders_customers
       references customers(id),

    shipment_option_id uuid not null
       constraint fk_orders_store_shipment_options
       references store_shipment_options(id),   

    payment_gateway_id uuid not null
       constraint fk_orders_store_payment_gateways
       references store_payment_gateways(id),

    order_number int not null
       constraint fk_orders_order_number
       default(nextval('seq_orders_order_number')),

    status order_status not null   
        constraint df_orders_status default('waiting'),

    notes text,
    shipment_address jsonb not null,

    utc_created_on timestamp not null 
       constraint df_orders_utc_created_on 
       default (now())            
);
alter sequence seq_orders_order_number owned by orders.order_number;

create table order_products (
    order_id uuid not null
       constraint fk_order_products_orders
          references orders(id),

    product_id uuid not null
        constraint fk_order_products_products
        references products(id),      
    
    product_option_id uuid not null
        constraint fk_order_products_product_option_id
        references product_options(id),

    quantity int not null,
    price int not null,
    price_total int not null,

    constraint pk_order_products primary key (
        order_id,
        product_id,
        product_option_id
    )    
);

create table order_events (
    id uuid not null
          constraint pk_order_events primary key 
          default (gen_random_uuid()),
     
     order_id uuid not null
     constraint fk_orde_events_orders
     references orders(id),

    title text not null,
    description text,
    event_data jsonb,

    utc_created_on timestamp not null 
       constraint df_order_events_utc_created_on 
       default (now())      
);

create table payments (
    id uuid not null
          constraint pk_payments primary key 
          default (gen_random_uuid()),

    order_id uuid not null
       constraint fk_payments_orders
          references orders(id),

    status payment_status not null
       constraint df_payment_status default ('waiting'),

    price int not null,
    price_total int not null,

   utc_created_on timestamp not null 
       constraint df_payments_utc_created_on 
       default (now()) 
);

create table payment_events (
    id uuid not null
          constraint pk_payment_events primary key 
          default (gen_random_uuid()),

      payment_id uuid not null
     constraint fk_payment_events_payments
     references payments(id),     

    title text not null,
    description text,
    event_data jsonb,

   utc_created_on timestamp not null 
       constraint df_payment_events_utc_created_on 
       default (now())
);