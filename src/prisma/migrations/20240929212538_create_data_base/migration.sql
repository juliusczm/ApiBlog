BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Category] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Name] NVARCHAR(80) NOT NULL,
    [Slug] VARCHAR(80) NOT NULL,
    CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [IX_Category_Slug] UNIQUE NONCLUSTERED ([Slug])
);

-- CreateTable
CREATE TABLE [dbo].[Post] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Title] NVARCHAR(max) NOT NULL,
    [Summary] NVARCHAR(max) NOT NULL,
    [Body] NVARCHAR(max) NOT NULL,
    [Slug] NVARCHAR(450) NOT NULL,
    [CreateDate] DATETIME2 NOT NULL,
    [LastUpdateDate] SMALLDATETIME NOT NULL CONSTRAINT [DF__Post__LastUpdate__534D60F1] DEFAULT CURRENT_TIMESTAMP,
    [CategoryId] INT NOT NULL,
    [AuthorId] INT NOT NULL,
    CONSTRAINT [PK_Post] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [IX_Post_Slug] UNIQUE NONCLUSTERED ([Slug])
);

-- CreateTable
CREATE TABLE [dbo].[PostTag] (
    [PostId] INT NOT NULL,
    [TagId] INT NOT NULL,
    CONSTRAINT [PK_PostTag] PRIMARY KEY CLUSTERED ([PostId],[TagId])
);

-- CreateTable
CREATE TABLE [dbo].[Role] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Name] NVARCHAR(80) NOT NULL,
    [Slug] VARCHAR(80) NOT NULL,
    CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [IX_Role_Slug] UNIQUE NONCLUSTERED ([Slug])
);

-- CreateTable
CREATE TABLE [dbo].[Tag] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Name] NVARCHAR(80) NOT NULL,
    [Slug] VARCHAR(80) NOT NULL,
    CONSTRAINT [PK_Tag] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [IX_Tag_Slug] UNIQUE NONCLUSTERED ([Slug])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Name] NVARCHAR(80) NOT NULL,
    [Email] VARCHAR(160) NOT NULL,
    [PassowrdHash] VARCHAR(255) NOT NULL,
    [Image] NVARCHAR(max),
    [Slug] VARCHAR(80) NOT NULL,
    [Bio] NVARCHAR(max),
    CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [IX_User_Slug] UNIQUE NONCLUSTERED ([Slug])
);

-- CreateTable
CREATE TABLE [dbo].[UserRole] (
    [RoleId] INT NOT NULL,
    [UserId] INT NOT NULL,
    CONSTRAINT [PK_UserRole] PRIMARY KEY CLUSTERED ([RoleId],[UserId])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Post_AuthorId] ON [dbo].[Post]([AuthorId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Post_CategoryId] ON [dbo].[Post]([CategoryId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_PostTag_TagId] ON [dbo].[PostTag]([TagId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_UserRole_UserId] ON [dbo].[UserRole]([UserId]);

-- AddForeignKey
ALTER TABLE [dbo].[Post] ADD CONSTRAINT [FK_Post_Author] FOREIGN KEY ([AuthorId]) REFERENCES [dbo].[User]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Post] ADD CONSTRAINT [FK_Post_Category] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Category]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PostTag] ADD CONSTRAINT [FK_PostTag_PostId] FOREIGN KEY ([PostId]) REFERENCES [dbo].[Post]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PostTag] ADD CONSTRAINT [FK_PostTag_TagId] FOREIGN KEY ([TagId]) REFERENCES [dbo].[Tag]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[UserRole] ADD CONSTRAINT [FK_UserRole_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Role]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[UserRole] ADD CONSTRAINT [FK_UserRole_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
