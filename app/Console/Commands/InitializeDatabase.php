<?php

namespace App\Console\Commands;

use App\Chapter;
use App\ChapterName;
use App\Corpus;
use App\Language;
use App\Page;
use App\Verse;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class InitializeDatabase extends Command
{
    protected $signature = 'database:init';

    protected $description = 'Initializes Quran database using files from tanzeel.';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $this->info('go to the command definition and use what\'s there');
    }

    protected function prepareDatabase()
    {
        $this->addSurasFromTanzeelXml();
        // addPages(); // 604
        // addParts(); // 30
        $this->addVersesFromTanzeelXml();
        $this->setVerseNumbers();
        $this->setProstrationTypesFromTanzeelXml();
        $this->setPageNumbersFromTanzeelXml();
        $this->createLanguages();
        $this->addChapterNamesFromTanzeelXml();
        $this->addCorpusFromTanzeelText();
        $this->addTranslationsFromTanzeelText();
    }

    protected function addSurasFromTanzeelXml()
    {
        $parser = simplexml_load_file(storage_path('corpus\quran-data.xml'));
        foreach ($parser->suras->sura as $sura) {
            Chapter::create([
                'revelation_location' => (string) $sura->attributes()->type,
                'revelation_order' => (int) $sura->attributes()->order,
            ]);
        }
    }

    protected function addVersesFromTanzeelXml()
    {
        $parser = simplexml_load_file(storage_path('corpus\quran-data.xml'));
        foreach ($parser->suras->sura as $sura) {
            $verse_count = (int) $sura->attributes()->ayas;
            for ($i = 1; $i <= $verse_count; $i++) {
                Verse::create([
                    'chapter_id' => (int) $sura->attributes()->index,
                    'page_id' => 0,
                ]);
            }
        }
    }

    protected function setVerseNumbers()
    {
        $chapters = Chapter::all();
        foreach ($chapters as $chapter) {
            $number = 0;
            foreach ($chapter->verses as $verse)
            {
                $verse->update(['number' => ++$number]);
            }
        }
    }

    protected function setProstrationTypesFromTanzeelXml()
    {
        $parser = simplexml_load_file(storage_path('corpus\quran-data.xml'));
        foreach ($parser->sajdas->sajda as $sajda) {
            Verse::where([
                'chapter_id' => (int) $sajda->attributes()->sura,
                'number' => (int) $sajda->attributes()->aya,
            ])->update([
                'prostration_type' => (string) $sajda->attributes()->type
            ]);
        }
    }

    protected function setPageNumbersFromTanzeelXml()
    {
        $parser = simplexml_load_file(storage_path('corpus\quran-data.xml'));
        foreach ($parser->pages->page as $page) {
            Verse::where([
                ['chapter_id', '=', (int) $page->attributes()->sura],
                ['number', '>=', (int) $page->attributes()->aya],
            ])->orWhere([
                ['chapter_id', '>', (int) $page->attributes()->sura]
            ])->update([
                'page_id' => (string) $page->attributes()->index
            ]);
        }
    }

    protected function createLanguages()
    {
        $languages = [
            'ar' => [
                'name' => 'العربية',
                'english_name' => 'Arabic',
                'direction' => 'rtl',
                'local' => 'ar',
            ],
            'fa' => [
                'name' => 'فارسی',
                'english_name' => 'Farsi',
                'direction' => 'rtl',
                'local' => 'fa',
            ],
            'en' => [
                'name' => 'English',
                'english_name' => 'English',
                'direction' => 'ltr',
                'local' => 'en',
            ],
        ];

        foreach ($languages as $language) {
            Language::create($language);
        }
    }

    protected function addChapterNamesFromTanzeelXml()
    {
        $parser = simplexml_load_file(storage_path('corpus\quran-data.xml'));
        foreach ($parser->suras->sura as $sura) {
            ChapterName::create([
                'type' => 'original', // translation / transliteration / original
                'name' => (string) $sura->attributes()->name,
                'language_id' => 1,
                'chapter_id' => (int) $sura->attributes()->index,
            ]);
        }
        foreach ($parser->suras->sura as $sura) {
            ChapterName::create([
                'type' => 'transliteration', // translation / transliteration / original
                'name' => (string) $sura->attributes()->tname,
                'language_id' => 3,
                'chapter_id' => (int) $sura->attributes()->index,
            ]);
        }
        foreach ($parser->suras->sura as $sura) {
            ChapterName::create([
                'type' => 'translation', // translation / transliteration / original
                'name' => (string) $sura->attributes()->ename,
                'language_id' => 3,
                'chapter_id' => (int) $sura->attributes()->index,
            ]);
        }
    }

    protected function addCorpusFromTanzeelText()
    {
        $corpus = Corpus::create([
            'title' => 'Quran Uthmani Min',
            'language_id' => 1,
            'type' => 'original', // original, translation, interpretation
        ]);

        $file = file(storage_path('corpus\quran-uthmani-min.txt'));

        foreach ($file as $num => $line) {
            $corpus->verse_texts()->create([
                'text' => trim($line),
                'verse_id' => ($num + 1),
            ]);
        }
    }

    protected function addTranslationsFromTanzeelText()
    {
        $files = scandir(storage_path('corpus'));
        foreach ($files as $file) {
            if (substr($file, 0, 2) === 'en') {
                $translation = storage_path('corpus\\' . $file);

                $corpus = Corpus::create([
                    'title' => Str::ucfirst(Str::before(Str::after($file, '.'),'.')),
                    'language_id' => 3,
                    'type' => 'translation', // original, translation, interpretation
                ]);

                $lines = file($translation);

                $bar = $this->output->createProgressBar(6236);
                $bar->start();

                foreach ($lines as $num => $line) {
                    $corpus->verse_texts()->create([
                        'text' => Str::after(Str::after(trim($line), '|'), '|'),
                        'verse_id' => ($num + 1),
                    ]);
                    $bar->advance();
                }

                $bar->finish();
                $this->info('imported ' . $file . ' to db.');
            }
        }
    }

    protected function setPagePartsFromTanzeelXml()
    {
        $parser = simplexml_load_file(storage_path('corpus\quran-data.xml'));
        foreach ($parser->juzs->juz as $juz) {
            $page_id = Verse::where([
                    'chapter_id' => (int) $juz->attributes()->sura,
                    'number' => (int) $juz->attributes()->aya,
                ])->first()->page_id;
            Page::where('id', '>=', $page_id)->update([
                'part_id' => (int) $juz->attributes()->index
            ]);
        }
    }
}
