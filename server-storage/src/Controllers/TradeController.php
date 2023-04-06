<?php

namespace Admin\Testservertrade\Controllers;

use Admin\Testservertrade\Controllers\BaseController;
use Admin\Testservertrade\Models\StatisticModel;
use Admin\Testservertrade\App\Exceptions\LogicException;

class TradeController extends BaseController
{
	public function __construct()
	{
		parent::__construct();
		//Code here ...

	}

	public function indexAction()
	{
		$item = StatisticModel::findLastOne();
		if ($item) {
			$res = json_encode($item->jsonSerialize());
			$this->renderJson($res);
		} else {
			throw new LogicException('$item must be set!');
		}
	}

	/**
	 * Create one item in db and then update this item when recive request from frontend
	 */
	public function saveAction($request)
	{
		$from = json_decode($request, true);
		$data = $from['toSave'];
		if (!empty($data)) {
			$item = StatisticModel::findLastOne();
			if ($item) {
				$item->populate($data, false);
				$toClient = $item->jsonSerialize();
				$res = $item->save();
			} else {
				$model = new StatisticModel();
				$model->populate($data, false);
				$toClient = $model->jsonSerialize();
				$res = $model->save();
			}
			$status = $res ? ['saved' => true, 'toClient' => $toClient] : ['saved' => false, 'message' => 'Data not saved!'];
			$this->renderJson(json_encode($status));
		} else {
			throw new LogicException('$data must be set!');
		}
	}

	/**
	 * Create new item any time when recive request from frontend
	 */
	public function createAction($request)
	{
		$from = json_decode($request, true);
		$data = $from['toSave'];
		if (!empty($data)) {
			$model = new StatisticModel();
			$model->populate($data, false);
			$res = $model->save();
			if ($res) {
				$items = StatisticModel::findAll();
				$collection = [];
				foreach ($items as $item) {
					$collection[] = $item->jsonSerialize();
				}
				$data = ['collection' => $collection, 'count' => count($collection)];
				$this->renderJson(json_encode($data));
			}
		} else {
			throw new LogicException('$data must be set!');
		}
	}

	public function dump($data)
	{
		echo '<pre>';
		var_dump($data);
		echo '</pre>';
	}
}
