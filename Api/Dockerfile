FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# copy *only* the csproj first for layer-cache
COPY Api.csproj ./
RUN dotnet restore

# now copy the rest
COPY . ./
RUN dotnet publish -c Release -o /src/out --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS runtime
WORKDIR /app
COPY --from=build /src/out .
EXPOSE 8080
ENTRYPOINT ["dotnet", "Api.dll"]
