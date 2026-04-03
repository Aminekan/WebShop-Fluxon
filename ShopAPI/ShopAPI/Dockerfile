FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["ShopAPI.csproj", "./"]
RUN dotnet restore "ShopAPI.csproj"
COPY . .
RUN dotnet build "ShopAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ShopAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ShopAPI.dll"]