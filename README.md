# A–News

Локальный прототип главной онлайн-журнала A–House. В корне открывается вариант на сетке A–House. [Первый макет](./first-draft/index.html) сохранён для сравнения. Оба варианта используют [один набор из девяти публикаций](./shared.js) и общий поиск. Ссылки ведут на оригиналы статей.

## Локальный просмотр

Запустите из корня репозитория:

```sh
python3 -m http.server 4178 --bind 127.0.0.1
```

- [Вариант на сетке A–House](http://127.0.0.1:4178/)
- [Первый макет](http://127.0.0.1:4178/first-draft/)

При локальном HTTP-просмотре запрос и выбранная тема сохраняются в адресе. Для быстрого просмотра можно открыть [index.html](./index.html) в браузере.

## Общие ресурсы A–House

Обе страницы используют [зафиксированную копию ресурсов](./vendor/a-house/) из [коммита 3244668 в A–House](https://github.com/anton-gorokhovatsky/a-house/tree/32446681cf1b5ecad4e6f4523aa0431f85baaf46).

- `typography.css` и `theme.css` взяты из `src/styles/` этого коммита.
- `fonts.css` содержит используемые начертания из `media/fonts/ahouse-fonts.css`. Файлы шрифтов взяты из того же коммита. Для Noto Serif приложен [текст лицензии](./vendor/a-house/notoserif-OFL.txt).

Чтобы обновить визуальную основу, сверяйте эти файлы с новым коммитом A–House и обновляйте ссылку на источник.

## Материалы

Главный материал и состав ленты выбраны для макета. Заголовки, даты и источники сведений взяты из публикаций A–News. Вступления к двум крупным материалам сокращены для главной. Изображения подготовлены в двух размерах из обложек оригиналов.

| Публикация | Источник изображения |
| --- | --- |
| [Музей Гуггенхайма в Бильбао](https://news.ahouseproject.com/glazami-arhitektora-muzej-guggenhajma-v-bilbao/) | Личный архив бюро .ket |
| [Проект Arch(e)type в Аргентине](https://news.ahouseproject.com/proekt-archetype-stal-finalistom-mezhdunarodnogo-konkursa-v-argentine/) | Пресс-служба бюро Arch(e)type |
| [Конструктор света «Люмарх»](https://news.ahouseproject.com/konstruktor-sveta-modulnaya-linejka-i-avtorskij-dizajn-lyumarh/) | Пресс-служба «Люмарх» |
| [Три предмета Liaigre](https://news.ahouseproject.com/liaigre-predstavil-tri-predmeta-interera-obrativshis-k-svoemu-naslediyu/) | Пресс-служба Liaigre |
| [Интервью Алексея Молчанова](https://news.ahouseproject.com/a-interview-aleksej-molchanov/) | Личный архив Алексея Молчанова |
