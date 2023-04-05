-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteAt" TIMESTAMP(3),
    "updateAt" TIMESTAMP(3),
    "createBy" TEXT,
    "updateBy" TEXT,
    "deleteBy" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories_products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteAt" TIMESTAMP(3),
    "updateAt" TIMESTAMP(3),
    "createBy" TEXT,
    "updateBy" TEXT,
    "deleteBy" TEXT,

    CONSTRAINT "categories_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "isDiscount" BOOLEAN NOT NULL,
    "category_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteAt" TIMESTAMP(3),
    "updateAt" TIMESTAMP(3),
    "createBy" TEXT,
    "updateBy" TEXT,
    "deleteBy" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories_commerces" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteAt" TIMESTAMP(3),
    "updateAt" TIMESTAMP(3),
    "createBy" TEXT,
    "updateBy" TEXT,
    "deleteBy" TEXT,

    CONSTRAINT "categories_commerces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commerces" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL DEFAULT false,
    "phone" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteAt" TIMESTAMP(3),
    "updateAt" TIMESTAMP(3),
    "createBy" TEXT,
    "updateBy" TEXT,
    "deleteBy" TEXT,

    CONSTRAINT "commerces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "complement" TEXT,
    "reference" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteAt" TIMESTAMP(3),
    "updateAt" TIMESTAMP(3),
    "createBy" TEXT,
    "updateBy" TEXT,
    "deleteBy" TEXT,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requests" (
    "id" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "commerce_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteAt" TIMESTAMP(3),
    "updateAt" TIMESTAMP(3),
    "createBy" TEXT,
    "updateBy" TEXT,
    "deleteBy" TEXT,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requests_products" (
    "id" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteAt" TIMESTAMP(3),
    "updateAt" TIMESTAMP(3),
    "createBy" TEXT,
    "updateBy" TEXT,
    "deleteBy" TEXT,

    CONSTRAINT "requests_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_tokens" (
    "id" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "fcm_token" BOOLEAN NOT NULL DEFAULT false,
    "expires_date" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteAt" TIMESTAMP(3),
    "updateAt" TIMESTAMP(3),
    "createBy" TEXT,
    "updateBy" TEXT,
    "deleteBy" TEXT,

    CONSTRAINT "users_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteAt" TIMESTAMP(3),
    "updateAt" TIMESTAMP(3),
    "createBy" TEXT,
    "updateBy" TEXT,
    "deleteBy" TEXT,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_users_commerces" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_address_commerces" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_address_users" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_users_roles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_users_commerces_AB_unique" ON "_users_commerces"("A", "B");

-- CreateIndex
CREATE INDEX "_users_commerces_B_index" ON "_users_commerces"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_address_commerces_AB_unique" ON "_address_commerces"("A", "B");

-- CreateIndex
CREATE INDEX "_address_commerces_B_index" ON "_address_commerces"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_address_users_AB_unique" ON "_address_users"("A", "B");

-- CreateIndex
CREATE INDEX "_address_users_B_index" ON "_address_users"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_users_roles_AB_unique" ON "_users_roles"("A", "B");

-- CreateIndex
CREATE INDEX "_users_roles_B_index" ON "_users_roles"("B");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commerces" ADD CONSTRAINT "commerces_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories_commerces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_commerce_id_fkey" FOREIGN KEY ("commerce_id") REFERENCES "commerces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests_products" ADD CONSTRAINT "requests_products_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests_products" ADD CONSTRAINT "requests_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_tokens" ADD CONSTRAINT "users_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users_commerces" ADD CONSTRAINT "_users_commerces_A_fkey" FOREIGN KEY ("A") REFERENCES "commerces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users_commerces" ADD CONSTRAINT "_users_commerces_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_address_commerces" ADD CONSTRAINT "_address_commerces_A_fkey" FOREIGN KEY ("A") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_address_commerces" ADD CONSTRAINT "_address_commerces_B_fkey" FOREIGN KEY ("B") REFERENCES "commerces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_address_users" ADD CONSTRAINT "_address_users_A_fkey" FOREIGN KEY ("A") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_address_users" ADD CONSTRAINT "_address_users_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users_roles" ADD CONSTRAINT "_users_roles_A_fkey" FOREIGN KEY ("A") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users_roles" ADD CONSTRAINT "_users_roles_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
